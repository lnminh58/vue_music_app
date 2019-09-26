
<template>
  <v-app>
    <v-app-bar clipped-left app color="amber darken-2" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Music Search Tool</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer clipped v-model="drawer" app>
      <v-list dense>
        <v-list-item :to="item.to" v-for="(item, index) in menu" :key="index">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container class="fill-height" fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "app",
  data: () => ({
    drawer: null,
    menu: [
      {
        name: "Tracks",
        icon: "mdi-music",
        to: "/"
      },
      {
        name: "Artists",
        icon: "mdi-person",
        to: "/about"
      }
    ]
  })
};
</script>
