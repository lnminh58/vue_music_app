
<template>
  <v-app>
    <v-app-bar clipped-left app color="indigo accent-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Music Search Tool</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer clipped v-model="drawer" app color="indigo accent-1">
      <v-list dense>
        <v-list-item :to="item.to" v-for="(item, index) in menu" :key="index">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <p style="position:absolute; left:5%; top:95%">Copyright © 2019 Phuoc Thiem Coporation Music search tool</p>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <keep-alive :include="keepAliveComponents">
        <router-view></router-view>
      </keep-alive>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "app",
  data: () => ({
    drawer: null,
    keepAliveComponents: "Track,Artist",
    menu: [
      {
        name: "Tracks",
        icon: "mdi-music",
        to: "/"
      },
      {
        name: "Artists",
        icon: "mdi-artist",
        to: "/artist"
      }
    ]
  })
};
</script>
