<template>
	<div>
		<nav>
			<router-link to="/">Accueil</router-link> |
			<router-link to="/about">À propos</router-link>
		</nav>
		<div class="container">
			<div class="home">
				<video type="video/mp4" autoplay :src="logoAnime"></video>
			</div>
			<div class="form">
				<div class="titleForm">
					<h2 :class="themeIns" @click="show_inscription">INSCRIPTION</h2>
					<h2>|</h2>
					<h2 :class="themeConn" @click="show_connexion">CONNEXION</h2>
				</div>
				<!-- permet d'eviter le rechargement de la page -->
				<form @submit.prevent="registerSubmit">
					<!-- permet de basculer entre connexion et inscription -->
					<!-- le v-show doit être sur True pour faire apparaître la Div -->
					<div v-show="inscription" class="bodyInscription">
						<label for="firstName">Prénom :</label>
						<input
							v-model="user.firstname"
							type="text"
							id="firstName"
							name="user_firstName"
						/>

						<label for="lastName">Nom :</label>
						<input
							v-model="user.lastname"
							type="text"
							id="lastName"
							name="user_lastName"
						/>

						<label for="email">Email :</label>
						<input
							v-model="user.email"
							type="email"
							id="email"
							name="user_email"
						/>

						<label for="password">Mot de passe :</label>
						<input
							v-model="user.password"
							type="password"
							id="password"
							name="user_password"
						/>

						<button type="submit">M'inscrire</button>
					</div>
				</form>
				<form @submit.prevent="loginSubmit">
					<div v-show="connexion" class="bodyConnexion">
						<label for="email">Email :</label>
						<input
							v-model="user.email"
							type="email"
							id="email"
							name="user_email"
						/>

						<label for="password">Mot de passe :</label>
						<input
							v-model="user.password"
							type="password"
							id="password"
							name="user_password"
						/>

						<button type="submit">Connexion</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import logoAnime from "@/assets/logoAnimé.mp4";

const HomeView = {
	data() {
		return {
			logoAnime: logoAnime,
			inscription: true,
			connexion: false,
			user: {
				firstname: "",
				lastname: "",
				email: "",
				password: "",
			},
			themeIns: "orange",
			themeConn: "",
		};
	},

	methods: {
		show_inscription() {
			this.inscription = true;
			this.connexion = false;
			this.themeIns = "orange";
			this.themeConn = "";
		},
		show_connexion() {
			this.connexion = true;
			this.inscription = false;
			this.themeIns = "";
			this.themeConn = "orange";
		},
		async registerSubmit() {
			console.log("hello");
			if (
				this.user.firstname ||
				this.user.lastname ||
				this.user.email ||
				this.user.password
			) {
				const promise = await fetch(
					"https://snapi-codebook.osc-fr1.scalingo.io/register",
					{
						method: "POST",
						body: JSON.stringify(this.user),
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				console.log(promise);
				let response = await promise.json();
				console.log(response);
				console.log("success", response.success);

				if (response.success) {
					alert(
						"Merci, votre inscription est validée !\nBienvenue sur CODE BOOK\nVous pouvez maintenant vous connecter"
					);
					this.user = "";
				} else {
					alert("Saisies incorrectes !");
				}
			} else {
				alert("Veuillez remplir tous les champs");
			}
		},

		async loginSubmit() {
			const promise = await fetch(
				"https://snapi-codebook.osc-fr1.scalingo.io/login",
				{
					method: "POST",
					body: JSON.stringify(this.user),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			console.log(promise);
			let response = await promise.json();
			console.log(response);

			if (response.success) {
				//--------------------- LOCAL STORAGE -------------------//
				localStorage.setItem("token", response.token);

				alert("Bravo, vous êtes maintenant connecté");
				/* $ est un equivalent à routerlink et else saisie incorrecte se lance par rapport au submit */
				this.$router.push("/page2");
			} else {
				alert("Saisies incorrectes !");
			}
		},
	},
};

export default HomeView;
</script>

<style scoped>
.container {
	display: flex;
	justify-content: center;
}
.titleForm {
	display: flex;
	justify-content: space-evenly;
}

*,
*:before,
*:after {
	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}

body {
	font-family: "Nunito", sans-serif;
	color: #384047;
}

form {
	max-width: 300px;
	margin: 10px auto;
	padding: 10px 20px;
	background: #f4f7f8;
	border-radius: 8px;
}

h2 {
	margin: 0 0 30px 0;
	text-align: center;
}

h2:hover {
	color: #d87418;
}

input[type="text"],
input[type="password"],
input[type="email"] {
	background: rgba(255, 255, 255, 0.1);
	border: none;
	font-size: 16px;
	height: auto;
	margin: 0;
	outline: 0;
	padding: 15px;
	width: 100%;
	background-color: #e8eeef;
	color: #8a97a0;
	box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03) inset;
	margin-bottom: 30px;
}

button {
	padding: 19px 39px 18px 39px;
	color: #fff;
	background-color: #d87418;
	font-size: 18px;
	text-align: center;
	font-style: normal;
	border-radius: 5px;
	width: 100%;
	border: 1px solid #d87418;
	border-width: 1px 1px 3px;
	box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.1) inset;
	margin-bottom: 10px;
}

label {
	display: block;
	margin-bottom: 8px;
}

@media screen and (min-width: 480px) {
	form {
		max-width: 480px;
	}
}
.orange {
	color: #d87418;
}
</style>
