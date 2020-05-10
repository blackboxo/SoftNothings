'use strict';
exports.main = async (event, context) => {
  //event为客户端上传的参数
  console.log('event : ' + event)
  const db = uniCloud.database();
  const collection = db.collection('softs');
  return collection.where({id:event.id}).count().then(function(res) {
  	return res;
  });
};
