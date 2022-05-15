<template>
  <nav>
    <!-- 		les liens apparaissent sur deux pages (about et home) car les liens doivent être present sur les deux items -->
    <router-link to="/">Accueil</router-link>
    <router-link to="/about">À propos</router-link>
  </nav>
  <div class="about">
    <h1>CODE BOOK</h1>
    <p class="about">
      Code Book est un réseau de rencontre et de partage d'expérience dédié aux
      développeurs web et web mobile. La plateforme est créée en 2022 par des
      étudiants développeurs pour faciliter la mise en relation des Dev juniors
      et seniors. <br />
      Ici vous pourrez publier des articles, poser des questions et répondre à
      d'autres afin de vous rendre utile à la communauté. <br />
      <br />
    </p>
    <img :src="fondAbout" alt="image" />
    <p>&copy; CODE BOOK</p>
  </div>
</template>
<script>
/* @ est un raccourci pour src  */
import fondAbout from "@/assets/fondAbout.jpeg";

const AboutView = {
  data() {
    return {
      fondAbout: fondAbout,
    };
  },
};
export default AboutView;
</script>

<style scoped>
h1 {
  background-color: #d87418;
}
.about {
  font-size: 20px;
  margin-left: 15px;
  margin-right: 15px;
}
img {
  width: 50%;
  border-radius: 10px;
  box-shadow: #d87418 8px 10px 10px;
}
</style>
