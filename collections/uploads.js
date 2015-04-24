Uploads = new FS.Collection('uploads',
{stores:[new FS.Store.FileSystem('uploads',{path:'/meteor_uploads'})]
});
Uploads.allow({
  insert:function(){
    return true;
  },
  update:function(){
    return true;
  },
  remove:function(){
    return true;
  },
  download:function(){
    return true;
  }
})

var STLstore= new FS.STore.Gridfs("STLs");

STLs = new FS.Collection("STLs", {
	stores: [STLstore]
});
STLs.deny({
 insert: function(){
 return false;
 },
 update: function(){
 return false;
 },
 remove: function(){
 return false;
 },
 download: function(){
 return false;
 }
 });

STLs.allow({
 insert: function(){
 return true;
 },
 update: function(){
 return true;
 },
 remove: function(){
 return true;
 },
 download: function(){
 return true;
 }
});