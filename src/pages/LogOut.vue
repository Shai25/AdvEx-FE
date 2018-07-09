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
          'Authorization': this.$session.get('token')
        },
        withCredentials: true
      }
    )
    .then(response => {
      this.$session.destroy();
      this.$router.push('/auth/login');
    })
    .catch(e => {
      // console.log(e.response);
      if ('error' in e.response.data) {
        // TODO: change alert to modal
        alert(e.response.data.error);
      }
      else {
        alert('Failed to log out.');
      }
      this.$router.push('/');
    });
  }
}
</script>
