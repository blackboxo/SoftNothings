<script>
	export default {
		onLaunch: function() {
			try {
				const id = uni.getStorageSync('id');
				const name = uni.getStorageSync('name');
				if (id) {
					this.$scope.globalData.id = id;
				}
				if (name) {
					this.$scope.globalData.name = name;
				}
			} catch (e) {
				console.log(e);
			}
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			name: '',
			id: '',
		}
	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";

	@keyframes show {
		0% {
			transform: translateY(-50px);
		}
	
		60% {
			transform: translateY(40upx);
		}
	
		100% {
			transform: translateY(0px);
		}
	}
	
	@-webkit-keyframes show {
		0% {
			transform: translateY(-50px);
		}
	
		60% {
			transform: translateY(40upx);
		}
	
		100% {
			transform: translateY(0px);
		}
	}
	/*每个页面公共css */
</style>
