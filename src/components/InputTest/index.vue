<template>
  <div class="app-container">
    <!-- text -->
    <div class="warp">
      文本：
      <input v-model="name" type="text" lazy>
      <span>{{ name }}</span>
    </div>
    <!-- checkbox -->
    <div class="warp">
      单个复选框：
      <input id="checkbox" v-model="checked" type="checkbox">
      <label for="checkbox">{{ checked }}</label>
    </div>
    <div class="warp">
      多个复选框（复选框组）：
      <input id="flash" v-model="checkbox" value="flash" type="checkbox">
      <label for="flash">快车</label>
      <input id="premium" v-model="checkbox" value="premium" type="checkbox">
      <label for="premium">专车</label>
      <input id="bus" v-model="checkbox" value="bus" type="checkbox">
      <label for="bus">巴士</label>
      <span>{{ checkbox }}</span>
    </div>
    <!-- radio -->
    <div class="warp">
      单选按钮：
      <input id="flash" v-model="radio" value="flash" type="radio">
      <label for="flash">快车</label>
      <input id="premium" v-model="radio" value="premium" type="radio">
      <label for="premium">专车</label>
      <input id="bus" v-model="radio" value="bus" type="radio">
      <label for="bus">巴士</label>
      <span>Picked：{{ radio }}</span>
    </div>
    <div class="warp">
      <input v-model="piecked" type="radio" value="a">{{ piecked }}
      <br>
      <input v-model="toggle" type="checkbox">{{ toggle }}
      <br>
      <select v-model="selected">
        <option value="abc">ABC</option>
      </select>{{ selected }}
    </div>

  </div>
</template>

<script>
export default {
  name: 'InputTest',
  data() {
    return {
      name: '',
      checked: 'true',
      checkbox: [],
      radio: '',
      piecked: '',
      toggle: false,
      selected: ''
    }
  }

}
</script>

<style lang="scss" scoped>
.warp{
  margin: 20px;
}

</style>
