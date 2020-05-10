<template>
	<view>
		<view class="center padding flex text-center text-grey bg-white shadow-warp" style="width: 100%;">
			<view class="cu-avatar radius" :style="avatar"></view>
		</view>
		<form @submit="formSubmit">
			<view class="cu-form-group margin-top">
				<view class="title">昵称</view>
				<input placeholder="输入你的昵称" :value="deName" @input="changeName" name="name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">SoftID</view>
				<input placeholder="定制你的 ID, 不可更改" :value="deID" :disabled="disable" name="id"></input>
			</view>
			<view class="cu-form-group">
				<textarea style="min-height: 200rpx;" maxlength="80" name="content" v-model="deContent" placeholder="输入你的 Soft Nothings"></textarea>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-orange margin-tb-sm lg" form-type="submit">发送</button>
			</view>
		</form>
		<uni-popup ref="popup" type="center">发送中...</uni-popup>
		<uni-popup ref="warning" type="center">不能为空</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				deName: "",
				deID: "",
				deContent: "",
				disable: false,
				avatar: ""
			}
		},
		methods: {
			changeName(e) {
				this.avatar = 'background-image:url(https://api.adorable.io/avatars/50/' + e.detail.value + '.png)'
			},
			formSubmit(e) {
				var _this = this;
				var value = e.detail.value;
				if (value.name == "" || value.id == "" || value.content == "") {
					this.$refs.warning.open()
					setTimeout(() => {
						_this.$refs.warning.close()
					}, 1000)
				} else {
					this.$refs.popup.open()
					getApp().globalData.name = value.name;
					getApp().globalData.id = value.id;
					try {
						uni.setStorageSync('id', value.id);
						uni.setStorageSync('name', value.name);
					} catch (e) {
						console.log(e);
					}
					uniCloud.callFunction({
							name: 'add',
							data: value
						})
						.then(res => {
							_this.deContent = "";
							_this.disable = true;
							this.$refs.popup.close()
						});
				}
			}
		},
		onShow() {
			this.deName = getApp().globalData.name;
			this.deID = getApp().globalData.id;
			if (this.deID) {
				this.disable = true;
			}
			this.avatar = 'background-image:url(https://api.adorable.io/avatars/50/' + this.deName + '.png)'
		}
	}
</script>

<style>
	.center {
		display: flex;
		justify-content: center;
	}
</style>
