<template>
  <form
    class="create-post-panel"
    @submit.prevent="createNewPost"
    :class="{ '--exceeded': newPostCharCount > 200 }"
  >
    <label for="txtPost">
      <strong>New Post : </strong>({{ newPostCharCount }}/200)
    </label>
    <textarea id="txtpost" rows="5" v-model="state.newPostContent" />

    <div class="create-post-panel_submit">
      <div class="create-post-type">
        <label for="ddlPostType"><strong>Post Type : </strong></label>

        <select id="ddlPostType" v-model="state.newPostType">
          <option
            v-for="(opt, index) in state.postTypes"
            :key="index"
            :value="opt.value"
          >
            {{ opt.typeName }}
          </option>
        </select>
      </div>

      <button :disabled="newPostCharCountOverLimit">Post It!</button>
    </div>
  </form>
</template>

<script>
import { reactive, computed } from "vue";

export default {
  name: "CreatePostPanel",
  setup(props, ctx) {
    const state = reactive({
      newPostContent: "",
      newPostType: "instant",
      postTypes: [
        { value: "draft", typeName: "Draft" },
        { value: "instant", typeName: "Instant" },
      ]
    });

    const newPostCharCount = computed(() => state.newPostContent.length);
    const newPostCharCountOverLimit = computed(()=> state.newPostContent.length > 200);

    function createNewPost() {
      if (state.newPostContent && state.newPostType !== "draft") {
        ctx.emit("add_post", state.newPostContent);
        state.newPostContent = "";
      }
    }

    return {
      state,
      newPostCharCount,
      newPostCharCountOverLimit,
      createNewPost
    };
  }
};
</script>

<style lang="scss" scoped>
.create-post-panel {
  padding-top: 20px;
  display: flex;
  flex-direction: column;

  textarea {
    border: 1px solid #dfe3e8;
    border-radius: 5px;
  }

  .create-post-panel_submit {
    display: flex;
    justify-content: space-between;

    .create-post-type {
      padding: 10px 0;
    }

    button {
      padding: 5px 20px;
      margin: auto 0;
      border-radius: 5px;
      border: none;
      background-color: indigo;
      color: white;
      font-weight: bold;
    }
  }

  &.--exceeded {
    color: red;
    border-color: red;

    .create-post-panel_submit {
      button {
        background-color: darkgray;
        color: white;
      }
    }
  }
}
</style>