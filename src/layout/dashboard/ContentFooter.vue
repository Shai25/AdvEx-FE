<template>
  <footer class="footer">
    <div class="container-fluid d-flex flex-wrap justify-content-between">
      <nav>
        <ul>
          <li>
            <router-link :to="{path:'/admin'}">AdvEx Dashboard</router-link>
          </li>
        </ul>
      </nav>
      <div class="copyright d-flex flex-wrap">
        &copy; 2018 AdvEx Team. All rights reserved.
      </div>
    </div>
  </footer>
</template>
<script>
export default {};
</script>
<style>
</style>
