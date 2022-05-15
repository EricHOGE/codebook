<template>
	<div class="bloc-modale" v-show="revele">
		<!-- "Permet de fermer la petite fenêtre infos user" -->
		<div class="overlay" v-on:click="toggle"></div>

		<div class="modale">
			<div v-on:click="toggle" class="btn-modale pointeur">X</div>
			<ul>
				<li>Prenom : {{ firstaname }}</li>
				<li>Nom : {{ lastname }}</li>
				<li>Email:{{ email }}</li>
				<li>Age: {{ age }}</li>
				<li>Poste:{{ occupation }}</li>
			</ul>
		</div>
	</div>
	<div class="nave">
		<img :src="logo" />
		<button @click="affichagePost">Crée un Post</button>
		<button @click="directionEdit">Modifier Profil</button>
		<button @click="directionClear">Deconnexion</button>
	</div>
	<div class="ecrireunarticle">
		<h1>Articles</h1>

		<form v-show="!check">
			<input type="text" placeholder="Titre" v-model="article.title" />
			<input
				type="text"
				placeholder="Saisir votre Article"
				v-model="article.content"
			/>
			<input type="submit" value="valider" @click.prevent="sendarticle" />
		</form>

		<div
			class="article"
			v-for="(informations, index) in articlecontenu"
			:key="index"
		>
			<p>Titre : {{ informations.title }}</p>
			<p>Description : {{ informations.content }}</p>
			<p class="pointeur" @click="affichageDuProfil(informations)">
				Auteur du post : {{ informations.firstname }}
				{{ informations.lastname }}
			</p>
			<i class="fa-solid fa-thumbs-up" @click="sendlike(informations)"></i>
			<p>Nb de LIKE :{{ informations.likes.length }}</p>

			<!-- Recuperation des commentaires -->
			<div
				class="comment"
				v-for="(element, index) in informations.comments"
				:key="index"
			>
				<p>Commentaire: {{ element.content }}</p>
				<p>
					Auteur du commentaire:{{ element.firstname }} {{ element.lastname }}
				</p>
			</div>

			<button @click="inputcommento = index">Commentaire</button>

			<div v-if="inputcommento === index">
				<textarea
					v-model="commentaire.content"
					type="text"
					name="Commentaire"
					placeholder="Laisser un commentaire"
					id="Commentaire"
					cols="30"
					rows="10"
				></textarea>
				<button @click="sendcomment(informations)">Envoyer</button>
			</div>
		</div>
	</div>
</template>

<script>
import logo from "../assets/book.png";
const Page2 = {
	data() {
		return {
			age: "",
			email: "",
			firstaname: "",
			lastname: "",
			occupation: "",
			revele: false,
			logo: logo,
			article: {
				title: "",
				content: "",
			},

			comment: {
				content: "",
			},
			user: {
				email: "",
				password: "",
			},
			token: "",
			articlecontenu: [],

			commentaire: {
				content: "",
				postId: "",
			},
			inputcommento: null,
			check: true,
		};
	},

	mounted() {
		this.token = localStorage.getItem("token");
		this.getPosts();
	},

	methods: {
		/* Permet l'affichage du post */
		affichagePost() {
			this.check = !this.check;
		},

		/* Permet l'affichage de l'utilisateur */
		async affichageDuProfil(informations) {
			let id = informations.userId;
			console.log("affichaduid", id);
			const promise = await fetch(
				"https://snapi-codebook.osc-fr1.scalingo.io/user/" + id,
				{
					method: "GET",
					parameters: JSON.stringify(id),
					headers: {
						"Content-Type": "application/json",
						Authorization: "bearer " + this.token,
					},
				}
			);
			console.log(promise, "recupID");
			const message = await promise.json();

			this.toggle();
			console.log(message, "retour message");
			this.firstaname = message.firstname;
			this.lastname = message.lastname;
			this.age = message.age;
			this.email = message.email;
			/* occupation = travail */
			this.occupation = message.occupation;
			console.log(this.firstaname, "prenom");

			if (promise.status === 200) {
				this.getPosts();
			}
		},
		directionClear() {
			localStorage.removeItem("token");
			/*  / est le nom de la page */
			this.$router.push("/");
		},

		/* Permet l'affichage du nom du posteur ou syntaxe numero 2 toggle()*/
		toggle: function () {
			this.revele = !this.revele;
		},

		async getPosts() {
			let response = await fetch(
				"https://snapi-codebook.osc-fr1.scalingo.io/posts"
			);
			const donnees = await response.json();
			console.log(response);
			console.log(donnees.posts, "jeu");
			this.articlecontenu = donnees.posts;
			console.log(this.articlecontenu, "alright");
		},

		async sendlike(informations) {
			this.commentaire.postId = informations._id;

			const promise = await fetch(
				"https://snapi-codebook.osc-fr1.scalingo.io/post/like",
				{
					method: "POST",
					body: JSON.stringify(this.commentaire),
					headers: {
						"Content-Type": "application/json",
						Authorization: "bearer " + this.token,
					},
				}
			);
			console.log(promise, "commentaire");
			const message = await promise.json();

			console.log(message, "retour message");
			if (promise.status === 200) {
				this.getPosts();
			}
		},

		directionEdit() {
			/* renvoie vers la page EDIT */
			this.$router.push("/edit");
		},
		async sendarticle() {
			const promise = await fetch(
				"https://snapi-codebook.osc-fr1.scalingo.io/post",
				{
					method: "POST",
					body: JSON.stringify(this.article),
					headers: {
						"Content-Type": "application/json",
						Authorization: "bearer " + this.token,
					},
				}
			);

			this.check = false;
			this.article = "";
			if (promise.status === 200) {
				this.getPosts();
			}
		},
		async sendcomment(informations) {
			this.commentaire.postId = informations._id;

			const promise = await fetch(
				"https://snapi-codebook.osc-fr1.scalingo.io/post/comment",
				{
					method: "POST",
					body: JSON.stringify(this.commentaire),
					headers: {
						"Content-Type": "application/json",
						Authorization: "bearer " + this.token,
					},
				}
			);
			console.log(promise, "commentaire");
			this.inputcommento = null;
			if (promise.status === 200) {
				this.getPosts();
			}
		},
	},
};

export default Page2;
</script>

<style scoped>
.nave {
	background-color: #d87418;
	display: flex;
	justify-content: space-around;
	margin: 0px;
}
button {
	background-color: rgb(211, 208, 208);
	margin: 30px;
	height: 50px;
	box-shadow: 2px 2px 2px black;
	border-radius: 70px;
	transition-duration: 0.4s;
}
button:hover {
	box-shadow: 0 10px 10px 0 #d87418, 0 5px 5px 0 #d87418;
	background-color: #d87418;
	color: white;
}
img {
	height: 80px;
	margin: 10px;
	border: solid 2px black;
}
/* dzadzad */
.bloc-modale {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
}

.overlay {
	background: rgba(0, 0, 0, 0.5);
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}

.modale {
	background: #f1f1f1;
	color: #d87418;
	padding: 20px;
	position: fixed;
	top: 30%;
}

.btn-modale {
	position: absolute;
	top: 10px;
	right: 10px;
}
.pointeur {
	cursor: pointer;
}
ul {
	list-style-type: none;
	padding: 0px;
}

/*******************    Style ARTICLE     *******************/

.article {
	background-color: rgb(228, 228, 228);
	padding: 10px;
	border-radius: 5px;
	box-shadow: 10px 5px 5px rgb(255, 183, 115);
	width: 70%;
	margin: 0 auto 20px;
}
i {
	font-size: 50px;
}
.comment {
	background-color: darkgray;
	border-radius: 10px;
	margin: 10px;
	padding: 10px;
}
</style>
