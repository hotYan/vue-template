<template>
  <div class="">编辑器
    <DefaultEditor
      language="json"
      :height="200"
      :code="value"
    />
    <!-- :code="`${JSON.stringify(value)}`" -->
  </div>
</template>

<script>
import DefaultEditor from './DefaultEditor.vue'
export default {
  name: 'EditorTest',
  components: { DefaultEditor },
  props: {
  },
  data() {
    return {
      value: [{ 'name': 1, 'value': 2 }, { 'name': 1, 'value': 2 }]
    }
  },

  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {

  }

}
</script>

<style lang="scss" scoped></style>
