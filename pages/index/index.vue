<template name="basics">
	<view>
		<scroll-view scroll-y class="page" @scrolltoupper="upper" @scrolltolower="lower">
			<uni-load-more :status="more" v-if="more!='more'" contentText="{contentdown: '下滑显示更多'}"></uni-load-more>
			<view class="nav-list">
				<navigator hover-class="navi" :style=item.animation v-for="(item,index) in elements" :key="index">
					<view class="cu-list menu-avatar comment solids-top">
						<view class="cu-item radius">
							<view class="cu-avatar radius" :style=item.style></view>
							<view class="content">
								<view class="text-grey">{{item.name}}</view>
								<view class="back padding-sm radius margin-top-sm text-sm">
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
		name: "basics",
		data() {
			return {
				elements: [],
				skip: 0,
				more: "more",
				moreD: "more",
			};
		},
		methods: {
			getMore(skip, limit, tag) {
				var _this = this;
				var value = {
					skip: skip,
					limit: limit,
				}
				if (tag) {
					this.more = "loading";
				} else {
					this.moreD = "loading";
				}
				uniCloud.callFunction({
						name: 'get',
						data: value
					})
					.then(res => {
						res.result.data.forEach((item, index) => {
							item["style"] = 'background-image:url(https://api.adorable.io/avatars/50/' + item.name + '.png)';
							if (skip == 0) {
								item["animation"] = "animation: show " + ((index + 1) * 0.2 + 1) + "s 1";
							}
						});
						_this.skip = skip + limit;
						if (tag) {
							_this.elements = [];
							_this.elements = res.result.data;
							_this.more = "more";
						} else {
							_this.elements = _this.elements.concat(res.result.data);
							_this.moreD = "more";
						}
					});
			},
			upper() {
				this.getMore(0, 20, true);
			},
			lower() {
				this.getMore(this.skip, 20, false);
			}
		},
		onShow() {
			this.getMore(0, 20, true);
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}

	navigator {
		width: 100%;
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
