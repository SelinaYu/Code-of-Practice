import Immutable from 'immutable';
export const UiState = Immutable.fromJS({
	spinnerVisible:false,
	isEdit:false
});
export const UserState = Immutable.fromJS({
	username:'',
	password:'',
	newPassword:'',
	reNewPassword:'',
	tel:'',
	sex:'',
	isAuthorized:false,
	accountID:'',
	accountRight:''
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
});

export const BookStoreState = Immutable.fromJS({
  name:'',
  addr:'',
  tele:''
})