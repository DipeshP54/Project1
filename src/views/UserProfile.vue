<template>
  <div class="user-profile">
    <div class="user-profile_sidebar">
      <div class="user-profile_user-panel">
        <h1 class="user-profile_userName">@{{ state.user.userName }}</h1>
        <div class="user-profile_admin-badge" v-if="state.user.isAdmin">Admin</div>
        <div class="use-profile_follower-count">
          <strong>Follwers: </strong> {{ state.followers }}
        </div>
      </div>
      <CreatePostPanel @add_post="addPost" />
    </div>
    <div class="user-profile_posts-wrapper">
      <PostItem
        v-for="disc in state.user.posts"
        :key="disc.id"
        :username="state.user.userName"
        :post="disc"
      />
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import { useRoute } from "vue-router";
import { users } from "@/assets/users";
import PostItem from "@/components/PostItem.vue";
import CreatePostPanel from "@/components/CreatePostPanel.vue";

export default {
  name: "UserProfile",
  components: { CreatePostPanel, PostItem },
  setup() {
    const route = useRoute();
    const userId = computed(() => route.params.userId);

    const state = reactive({
      followers: 0,
      user: users[userId.value - 1] || users[0]
    });

    function addPost(post) {
      state.user.posts.unshift({
        id: state.user.posts.length + 1,
        content: post,
      });
    }

    return {
      state,
      addPost,
      userId
    };
  }
};
</script>


<style lang="scss" scoped>
.user-profile {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 50px;
  padding: 50px 5%;

  .user-profile_user-panel {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #dfe3e8;
    margin-bottom: auto;

    h1 {
      margin: 0;
    }

    .user-profile_admin-badge {
      background: rebeccapurple;
      color: white;
      border-radius: 5px;
      margin-right: auto;
      margin-top: 5px;
      margin-bottom: 5px;
      padding: 0 10px;
      font-weight: bold;
    }
  }

  .user-profile_posts-wrapper {
    display: grid;
    grid-gap: 10px;
    margin-bottom: auto;
  }
}

//npm install [package-name]@[version-number]
</style>