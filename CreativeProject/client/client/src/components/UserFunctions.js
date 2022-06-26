import axios from 'axios'

export const register = newUser => {
	return axios
	.post('users/register',{
		firstname: newUser.firstname,
		lastname: newUser.lastname,
		email: newUser.email,
		password: newUser.password
	})
	.then(res => {
		console.log("this is res: " + Object.keys(res))
		console.log("this is res: " + Object.values(res))
    console.log(res.data)
    alert("Your account has successfully created, please log in.")
	})
	.catch(err => {
		alert("This email has already registered. Please change another email address.")
	})
}


export const login = user => {
	return axios
	.post('users/login', {
		email: user.email,
		password: user.password
	})
	.then(res => {
		localStorage.setItem('usertoken', res.data.token)
		return res.data
	})
	.catch(err => {
		console.log(err)
	})
}


export const changePassword = changeUser => {
  return axios
  .post('users/changePassword',{
    email: changeUser.email,
    password: changeUser.password,
    newPassword: changeUser.newPassword
  })
  .then(res => {
    Object.keys(res.data.result).forEach(key => {
              alert(res.data.result[key])
        });
  })
  .catch(err => {
    console.log(err)
  })
}


export const getList = () => {
    return axios
        .get('users/carts', {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
        	localStorage.removeItem("totalprice")
            var result = []
            var totalprice = 0
            Object.keys(res.data).forEach((key) => {
                var val = res.data[key]
                Object.keys(val).forEach((key) => {
                	var items = val[key]
                	result.push([items.itemid, items.userid, items.quantity, items.itemname, items.itempicture, items.itemtype, items.itemprice])
         			totalprice += items.quantity * items.itemprice
            	})
            })
            localStorage.setItem('totalprice',totalprice)
            

            return result
        })
}


export const viewFriendPurchased = term => {
  return axios
   .post('users/friendPurchased', {
    friendemail: term
   },{
    headers: { "Content-type": "application/json" }
   })
   .then((res) => {
    var result = []
        Object.keys(res.data).forEach((key) => {
                var val = res.data[key]
                Object.keys(val).forEach((key) => {
                  var items = val[key]
                  result.push([items.itemid, items.quantity, items.itemname, items.itempicture, items.itemtype, items.itemprice])
              
              })
            })
            return result
        })
        .catch(err => {
          console.log(err)
        })
}



export const getItemById = term => {
	return axios
	 .post('users/item', {
	 	itemid: term
	 },{
	 	headers: { "Content-type": "application/json" }
	 })
	 .then((res) => {
	 	var result = []
	 	result.push([res.data.items.itemid,res.data.items.itemname, res.data.items.itemprice,res.data.items.itempicture, res.data.items.itemtype])
	 	console.log(res.data.items.itemid)
    return result

        })
        .catch(err => {
        	console.log(err)
        })
}

export const getCommentList = term => {
    return axios
        .post('users/comments',{
                itemid: term
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach((key) => {

                var val = res.data[key]
                console.log(val)
                Object.keys(val).forEach((key) => {
                	var items = val[key]
                	data.push([items.userfirstname, items.userlastname, items.useremail, items.commenttext,items.commentid])
            	})
            })

            console.log(data)

            return data
        })
}

export const addComment = commentvariable => {
    return axios
        .post(
            'users/comment', {
                commenttext: commentvariable.commenttext,
                itemid: commentvariable.itemid
            }, {
                headers: { "Content-type": "application/json" }
            })
        .then((res) => {

        	Object.keys(res.data.result).forEach(key => {
          		alert(res.data.result[key])
        });
        })
        .catch(err => {
        	console.log(err)
        })
}


export const addToList = term => {
    return axios
        .post(
            'users/cart', {
                itemid: term
            }, {
                headers: { "Content-type": "application/json" }
            })
        .then((res) => {

        	Object.keys(res.data.result).forEach(key => {
          		alert(res.data.result[key])
        });
        })
        .catch(err => {
        	console.log(err)
        })
}

export const addFriend = term => {
    return axios
        .post(
            'users/friend', {
                friendemail: term
            }, {
                headers: { "Content-type": "application/json" }
            })
        .then((res) => {

        	Object.keys(res.data.result).forEach(key => {
          		alert(res.data.result[key])
        });
        })
        .catch(err => {
        	console.log(err)
        })
}


export const getFriend = () => {
    return axios
        .get('users/friend', {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach((key) => {

                var val = res.data[key]
                console.log(val)
                Object.keys(val).forEach((key) => {
                	var items = val[key]
                	data.push([items.userid, items.friendemail])
            	})
            })

            console.log(data)

            return data
        })
}



export const deleteFriend = term => {
    return axios
        .delete(
            `users/friend/${term}`, {
                headers: { "Content-type": "application/json" }
            })
        .then((res) => {
            console.log(res)
        })
        .catch((res) => {
            console.log(res)
        })
}



export const addToPurchaseList = term => {
    return axios
        .post(
            'users/purchase',{
                headers: { "Content-type": "application/json" }
            })
        .then((res) => {
            Object.keys(res.data.result).forEach(key => {
          		alert(res.data.result[key])
        	});
        })
}



export const addToWishlist = term => {
    return axios
        .post(
            'users/wishlist', {
                itemid: term
            }, {
                headers: { "Content-type": "application/json" }
            })
        .then((res) => {
            Object.keys(res.data.result).forEach(key => {
          		alert(res.data.result[key])
        	});
        })
}


export const deleteItem = term => {
    return axios
        .delete(
            `users/cart/${term}`, {
                headers: { "Content-type": "application/json" }
            })
        .then((res) => {
            console.log(res)
        })
        .catch((res) => {
            console.log(res)
        })
}

export const updateItem = (term, id) => {
    return axios
        .put(
            `users/cart/${id}`, {
                quantity: term
            }, {
                headers: { "Content-type": "application/json" }
            })
        .then((res) => {
            console.log(res)
        })
}


export const getWishlist = () => {
    return axios
        .get('users/wishlists', {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach((key) => {

                var val = res.data[key]
                console.log(val)
                Object.keys(val).forEach((key) => {
                	var items = val[key]
                	data.push([items.itemid, items.userid, items.itemname, items.itempicture, items.itemtype, items.itemprice])
            	})
            })

            console.log(data)

            return data
        })
}

export const deleteWishlist = term => {
    return axios
        .delete(
            `users/wishlist/${term}`, {
                headers: { "Content-type": "application/json" }
            })
        .then((res) => {
            console.log(res)
        })
        .catch((res) => {
            console.log(res)
        })
}


export const deleteComment = term => {
    return axios
        .delete(
            `users/comment/${term}`, {
                headers: { "Content-type": "application/json" }
            })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
}







export const show_women_items = () => {
  return axios
    .get("users/womenitems", {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var data = [];
      Object.keys(res.data).forEach(key => {
        var val = res.data[key];
        console.log(val);
        Object.keys(val).forEach(key => {
          var items = val[key];
          data.push([
            items.itemid,
            items.itemname,
            items.itempicture,
            items.itemtype,
            items.itemprice
          ]);
        });
      });

      console.log(data);

      return data;
    });
};


export const show_men_items = () => {
  return axios
    .get("users/menitems", {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var data = [];
      Object.keys(res.data).forEach(key => {
        var val = res.data[key];
        console.log(val);
        Object.keys(val).forEach(key => {
          var items = val[key];
          data.push([
            items.itemid,
            items.itemname,
            items.itempicture,
            items.itemtype,
            items.itemprice
          ]);
        });
      });

      console.log(data);

      return data;
    });
};


export const show_filter_menitems = (min, max) => {
  console.log(min);
  console.log(max);
  return axios
    .get("users/menitems", {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var data = [];
      Object.keys(res.data).forEach(key => {
        var val = res.data[key];
        console.log(val);
        function filtering(val) {
          if (val.itemprice >= min && val.itemprice <= max) return val;
        }
        const result = val.filter(filtering);
        console.log(result);
        Object.keys(result).forEach(key => {
          var items = result[key];
          console.log(items);
          data.push([
            items.itemid,
            items.itemname,
            items.itempicture,
            items.itemtype,
            items.itemprice
          ]);
        });
      });

      console.log(data);
      return data;
    });
};

export const show_search_menitems = search => {
  console.log(search);
  return axios
    .get("users/menitems", {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var data = [];
      Object.keys(res.data).forEach(key => {
        var val = res.data[key];
        console.log(val);
        function filtering(val) {
          if (
            val.itemname
              .toString()
              .toLowerCase()
              .search(search) > 0
          )
            return val;
        }
        const result = val.filter(filtering);
        console.log(result);
        Object.keys(result).forEach(key => {
          var items = result[key];
          console.log(items);
          data.push([
            items.itemid,
            items.itemname,
            items.itempicture,
            items.itemtype,
            items.itemprice
          ]);
        });
      });

      console.log(data);
      return data;
    });
};

export const show_filter_womenitems = (min, max) => {
  console.log(min);
  console.log(max);
  return axios
    .get("users/womenitems", {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var data = [];
      Object.keys(res.data).forEach(key => {
        var val = res.data[key];
        console.log(val);
        function filtering(val) {
          if (val.itemprice >= min && val.itemprice <= max) return val;
        }
        const result = val.filter(filtering);
        console.log(result);
        Object.keys(result).forEach(key => {
          var items = result[key];
          console.log(items);
          data.push([
            items.itemid,
            items.itemname,
            items.itempicture,
            items.itemtype,
            items.itemprice
          ]);
        });
      });

      console.log(data);
      return data;
    });
};

export const show_search_womenitems = search => {
  console.log(search);
  return axios
    .get("users/womenitems", {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var data = [];
      Object.keys(res.data).forEach(key => {
        var val = res.data[key];
        console.log(val);
        function filtering(val) {
          if (
            val.itemname
              .toString()
              .toLowerCase()
              .search(search) > 0
          )
            return val;
        }
        const result = val.filter(filtering);
        console.log(result);
        Object.keys(result).forEach(key => {
          var items = result[key];
          console.log(items);
          data.push([
            items.itemid,
            items.itemname,
            items.itempicture,
            items.itemtype,
            items.itemprice
          ]);
        });
      });

      console.log(data);
      return data;
    });
};


export const rec_men_items = rec_temp => {
  console.log(rec_temp);
  var search;
  if (parseInt(rec_temp) < 60) {
    search = "shirt";
  } else {
    search = "jacket";
  }
  return axios
    .get("users/menitems", {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var data = [];
      Object.keys(res.data).forEach(key => {
        var val = res.data[key];
        console.log(val);
        function filtering(val) {
          if (val.itemname.toLowerCase().search(search) > 0) return val;
        }
        const result = val.filter(filtering);
        console.log(result);
        Object.keys(result).forEach(key => {
          var items = result[key];
          console.log(items);
          data.push([
            items.itemid,
            items.itemname,
            items.itempicture,
            items.itemtype,
            items.itemprice
          ]);
        });
      });

      console.log(data);
      return data;
    });
};

export const rec_women_items = rec_temp => {
  console.log(rec_temp);
  var search;
  if (parseInt(rec_temp) < 60) {
    search = "dress";
  } else {
    search = "jacket";
  }
  return axios
    .get("users/womenitems", {
      headers: { "Content-type": "application/json" }
    })
    .then(res => {
      var data = [];
      Object.keys(res.data).forEach(key => {
        var val = res.data[key];
        console.log(val);
        function filtering(val) {
          if (
            val.itemname
              .toString()
              .toLowerCase()
              .search(search) > 0
          )
            return val;
        }
        const result = val.filter(filtering);
        console.log(result);
        Object.keys(result).forEach(key => {
          var items = result[key];
          console.log(items);
          data.push([
            items.itemid,
            items.itemname,
            items.itempicture,
            items.itemtype,
            items.itemprice
          ]);
        });
      });

      console.log(data);
      return data;
    });
};



