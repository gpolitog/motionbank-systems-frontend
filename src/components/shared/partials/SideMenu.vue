<template lang="pug">
  #sidemenu
    ul
      li.root
        a(@click="$router.push({ name: 'stash.listVideos' })") Übersicht: meine Videos
        ul
          li
            a(@click="$router.push({ name: 'stash.VideoDetail' })") (in use) Video 1
          li
            a(@click="$router.push({ name: 'stash.VideoDetail' })") (hidden) Video 2
      li.root
        a(@click="$router.push({ name: 'stash.listPrivate' })") Alle eigenen Gruppen
        ul
          li.sub (hidden) Nur für mich sichtbar
            ul
              li
                a(@click="$router.push({ name: 'stash.groupPrivateDetail' })") (hidden) Gruppe 1
              li
                a(@click="$router.push({ name: 'stash.groupPrivateDetail' })") (hidden) Gruppe 2
          li.sub (closed) Von mir zur Gruppenbearbeitung freigegebene Gruppen (invitation only)
            ul
              li
                a(@click="$router.push({ name: 'stash.groupPrivateDetail' })") (closed) Gruppe a
              li
                a(@click="$router.push({ name: 'stash.groupPrivateDetail' })") (closed) Gruppe b
          li.sub (public/shared) Von mir veröffentlichte Gruppen (für jeden zugänglich)
            ul
              li
                a(@click="$router.push({ name: 'stash.groupPrivateDetail' })") (public) Gruppe *
              li
                a(@click="$router.push({ name: 'stash.groupPrivateDetail' })") (public) Gruppe **
      li.root
        a(@click="$router.push({ name: 'stash.listGroups' })") Alle fremden Gruppen, an denen ich beteiligt bin
        ul
          li.sub
            a(@click="$router.push({ name: 'stash.groupGroupsDetail' })") (public) Gruppe a
          li.sub
            a(@click="$router.push({ name: 'stash.groupGroupsDetail' })") (closed & visible) Gruppe b
          li.sub
            a(@click="$router.push({ name: 'stash.groupGroupsDetail' })") (closed & hidden) Gruppe c
      li.root
        a(@click="$router.push({ name: 'stash.listAllPublic' })") Alle anderen öffentlichen Gruppen
        ul
          li.sub (read only) nur lesbar
            ul
              li
                a(@click="$router.push({ name: 'stash.groupAllPublicDetail' })") (read only) Gruppe AAA
              li
                a(@click="$router.push({ name: 'stash.groupAllPublicDetail' })") (read only) Gruppe BBB
          li.sub (read & edit) les- und editierbar
            ul
              li
                a(@click="$router.push({ name: 'stash.groupAllPublicDetailEdit' })") (read & edit) Gruppe ---
              li
                a(@click="$router.push({ name: 'stash.groupAllPublicDetailEdit' })") (read & edit) Gruppe ...
</template>

<script>
  export default {
    // name: 'side-menu'
  }
</script>

<style scoped>
  #sidemenu {
    width: 20vw;
    height: 100%;
    display: inline-block;
    vertical-align: top;
    padding: .5em;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
    cursor: pointer;
    margin-bottom: 5px;
    padding: .5em;
    background-color: transparent;
  }
  li.root:not(:last-of-type) {
    border-bottom: 1px solid white;
  }
  li.root:first-of-type {
    border: 1px solid #aaa;
    border-radius: 1em;
    margin-bottom: 2em;
  }

</style>
