'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ' + event)
	const db = uniCloud.database();
	const collection = db.collection('softs');
	return collection.orderBy("created_at", "desc").limit(parseInt(event.limit)).skip(parseInt(event.skip)).get().then(function(res) {
		return res;
	});
};
