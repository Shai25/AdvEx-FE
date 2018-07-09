<template>
</template>

<script>
export default {
  created: function() {
    axios.post(API_PREFIX + '/logout',
      {
        'user_id': this.$session.get('user_id')
      },
      {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true
      }
    )
    .then(response => {
      this.$session.destroy();
      this.$router.push('/auth/login');
    })
    .catch(e => {});
  }
}
</script>
