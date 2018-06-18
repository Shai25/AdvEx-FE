<template>
	
</template>

<script>
export default {
	created: function() {
		 this.$session.destroy();
     this.$router.push('/auth/login');
	}
}
</script>
