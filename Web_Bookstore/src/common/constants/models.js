import Immutable from 'immutable';
export const UiState = Immutable.fromJS({
	spinnerVisible:false,
	isEdit:false
});
export const UserState = Immutable.fromJS({
	username:'',
	password:'',
	isAuthorized:false
});

export const BookState = Immutable.fromJS({
	books:[],
	book:{
		bookID:'',
		bookName:'',
		bookWriter:'',
		bookUrl:'',
		bookPublisher:'',
		bookNo:'',
		bookPrice:''
  }
})
