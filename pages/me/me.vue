<template>
	<view>
		<scroll-view scroll-y class="page" @scrolltolower="lower">
			<view class="UCenter-bg">
				<!-- 		<view class="cu-avatar radius" :style="avatar"></view>
			<view class="text-xl margin-top">{{deName}}</view>
			<view class="margin-top-sm">
				<text>ID:{{deID}}</text>
			</view> -->
			</view>
			<view class="padding flex text-center text-grey bg-white shadow-warp">
				<view class="flex flex-sub flex-direction solid-right">
					<view class="text-xxl text-orange">{{number}}</view>
					<view class="margin-top-sm">
						<text>Softs</text>
					</view>
				</view>
			</view>
			<view class="nav-list">
				<navigator hover-class="navi" :style=item.animation v-for="(item,index) in elements"
				 :key="index">
					<view class="cu-list menu-avatar comment solids-top">
						<view class="cu-item radius">
							<view class="cu-avatar radius" :style=item.style></view>
							<view class="content">
								<view class="text-grey">{{item.name}}</view>
								<view class="back padding-sm radius margin-top-sm  text-sm">
									<view class="flex">
										<view class="flex-sub">{{item.content}}</view>
									</view>
								</view>
								<view class="margin-top-sm flex justify-between">
									<view class="text-gray text-df">{{item.created_at}}</view>
								</view>
							</view>
						</view>
					</view>
				</navigator>
			</view>
		</scroll-view>
		<uni-load-more :status="moreD" v-if="moreD!='more'"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				elements: [],
				number: 0,
				skip: 0,
				avatar: "",
				deName: "",
				deID: "",
				moreD: "more",
			};
		},
		methods: {
			getNum() {
				var _this = this;
				var value = {
					id: this.deID,
				}
				uniCloud.callFunction({
						name: 'getNew',
						data: value
					})
					.then(res => {
						_this.number = res.result.total;
					});
			},
			getMore(skip, limit) {
				var _this = this;
				var value = {
					id: this.deID,
					skip: skip,
					limit: limit,
				}
				this.moreD = "loading";
				uniCloud.callFunction({
						name: 'getMine',
						data: value
					})
					.then(res => {
						res.result.data.forEach((item,index) => {
							item["style"] = 'background-image:url(https://api.adorable.io/avatars/50/' + item.name + '.png)'
							if (skip == 0) {
								item["animation"] = "animation: show " + ((index + 1) * 0.2 + 1) + "s 1";
							}
						})
						_this.skip = skip + limit;
						if (skip != 0) {
							_this.elements = _this.elements.concat(res.result.data);
						} else {
							_this.elements = [];
							_this.elements = res.result.data;
						}
						_this.moreD = "more";
					});
			},
			lower() {
				this.getMore(this.skip, 20);
			}
		},
		onShow() {
			this.deName = getApp().globalData.name;
			this.deID = getApp().globalData.id;
			this.avatar = 'background-image:url(https://api.adorable.io/avatars/50/' + this.deName + '.png)'
			var _this = this;
			var value = {
				id: this.deID,
			};
			this.getNum();
			this.getMore(0, 20);
		}
	}
</script>

<style>
	.UCenter-bg {
		background-image: url(https://markdown-pic-blackboxo.oss-cn-shanghai.aliyuncs.com/banner-80.png);
		background-size: cover;
		height: 400rpx;
		display: flex;
		justify-content: center;
		padding-top: 40rpx;
		overflow: hidden;
		position: relative;
		flex-direction: column;
		align-items: center;
		color: #fff;
		font-weight: 300;
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
	}

	navigator {
		width: 100%;
	}

	.page {
		height: 100vh;
	}

	.radius {
		border-radius: 10px;
	}

	uni-navigator {
		min-width: 100%;
	}

	.cu-list {
		margin-top: 10rpx;
		;
	}

	.nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0px 30rpx 0px;
		justify-content: space-between;
	}

	.back {
		background-color: #fef4f4;
	}
</style>
