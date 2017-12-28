var Pieza = function (_id, _x, _y, _w, _h) {
	this.id = _id,
	this.x = _x,
	this.y = _y,
	this.width = _w,
	this.height = _h,
	this.path = "",
	this.image = new Image();
	this.xCrop = 0;
	this.yCrop = 0;
	
	this.setImageURL = function(url){
		this.path = url;
		this.image.src = this.path;
	}
	this.setImageCrop = function(_x, _y){
		this.xCrop = _x;
		this.yCrop = _y;
	}
}