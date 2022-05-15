<template>
	<div>
		<div class="titleForm">
			<h2>Édition du profil</h2>
		</div>

		<div class="container">
			<img :src="logo" class="logo" alt="" />
			<form @submit.prevent="editSubmit">
				<div>
					<label for="lastName">Nom :</label>
					<input
						v-model="user.lastname"
						type="text"
						id="lastName"
						name="user_lastName"
					/>
					<label for="firstName">Prénom :</label>
					<input
						type="text"
						v-model="user.firstname"
						id="firstName"
						name="user_firstName"
					/>

					<label for="email">Email :</label>
					<input
						v-model="user.email"
						type="email"
						id="email"
						name="user_email"
					/>

					<label for="age">Âge</label>
					<input
						@input="ageVerif"
						type="text"
						id="age"
						name="user-age"
						:value="user.age"
					/>

					<label for="occupation">Profession</label>
					<input
						v-model="user.occupation"
						type="text"
						name="occupation"
						id="user-occupation"
					/>
					<input type="submit" @click="envoie" value="valider" />
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import logo from "../assets/Logo_Code_book.png";
const Main = {
	data() {
		return {
			user: {
				lastname: "",
				firstname: "",
				email: "",
				password: "",
				age: "",
				occupation: "",
			},
			acces: "",
			logo: logo,
		};
	},
	mounted() {
		this.acces = localStorage.getItem("token");
		this.recupeEdit();
	},
	methods: {
		async envoie() {
			let token = this.acces;
			const promise = await fetch(
				"https://snapi-codebook.osc-fr1.scalingo.io/user",
				{
					method: "PUT",
					body: JSON.stringify(this.user),
					headers: {
						"Content-Type": "application/json",
						Authorization: "bearer " + token,
					},
				}
			);
			console.log(promise);
			this.$router.push("/page2");
		},
		async recupeEdit() {
			let token = this.acces;

			const promise = await fetch(
				"https://snapi-codebook.osc-fr1.scalingo.io/user",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "bearer " + token,
					},
				}
			);
			console.log(promise, "test");
			let recu = await promise.json();
			console.log(recu, "lol");
			this.user.firstname = recu.firstname;
			this.user.lastname = recu.lastname;
			this.user.email = recu.email;
			this.user.age = recu.age;
			this.user.occupation = recu.occupation;
		},
		ageVerif(e) {
			console.log("hello");
			if (isNaN(e.target.value)) {
				e.target.value = this.user.age;
				return;
			}
			this.user.age = e.target.value;
			console.log(typeof this.user.age);
		},
	},
};
export default Main;
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
.logo {
	height: 40vh;
	width: 30vw;
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
	background: #d87418;
	border-radius: 8px;
	margin-right: 38%;
}

input[type="text"],
input[type="password"],
input[type="email"] {
	background: white;
	border: none;
	font-size: 16px;
	height: auto;
	margin: 0;
	outline: 0;
	padding: 15px;
	width: 100%;
	background-color: white;
	color: #d87418;
	margin-bottom: 30px;
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
</style>
