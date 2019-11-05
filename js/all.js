//  item 是 回傳資料物件陣列  v-for="(item, key) in filtertodos" <--- 這裡定義了回傳名稱
var app = new Vue({
  el: '#app',
  data: {
    newtodo: '',
    todos: [
      {
        id: '',
        title: '請輸入',
        completed: false,
      }
    ],
    cacheTodo: {},
    cacheTitle: '',
    visibility: 'all',
  },
  methods: {
      addtodo: function() {
      let value = this.newtodo.trim();   // 取得 <iuput> 輸入的值 trim 去除空白
      let timestamp = Math.floor(Date.now());  // 取得整數時間戳記
      //console.log(value, timestamp); 
      if (!value) {  // 如果沒有輸入的話，不會新增事項。 (value是空值) 條件會成立，不會進到 push 那段 
        return ;    
      }
      this.todos.push({     // 新增資料到 todos 裡
          id: timestamp,
          title: value,
          completed: false,
       })
      this.newtodo ='';    // 清空輸入格
      }, 
      // removetodo: function(key) {  // 藉由傳入的 key 值來識別刪除
      //  this.todos.splice(key, 1);
      // },
      removetodo: function(todo) {   // 處理切換頁面刪除事項的 bug
      let vm = this;
      let newindex = this.todos.findIndex(function(item, key) {  //用 findIndex 去找相同 id 的物件
          return todo.id === item.id;   // 若找到相同 id 回傳此 id 
      })
       this.todos.splice(newindex, 1);  // 刪除物件陣列裡相同 id 的事項 
      },
      clearall: function() {      // 清除所有 todos 物件內容
          return this.todos = [];
      },
      edittodo: function(item) {   // 傳入被點選的事項 todo 進行註解修改
      //console.log(item);           
      this.cacheTodo = item;       // 修改後資料存到暫放區   
      this.cacheTitle = item.title;
      },
      canceledit: function() {     // 消除修改
        this.cacheTodo = {};
      },
      doneedit: function(item) {    // 
        item.title = this.cacheTitle;
        this.cacheTitle = "";
        this.cacheTodo = {};
      },
    },
    computed: {
      filtertodos: function() {   // 用 visibility 屬性值來判斷資料的內容
        if (this.visibility == 'all'){
          return this.todos;
        } else if (this.visibility == 'active'){
          let newtodos = [];
          this.todos.forEach(item => {  // 一個一個物件傳進來
            if (!item.completed) {   // 檢查屬性是否完成，未完成的話
               newtodos.push(item);
            }  
          });
        //return [];  // 測試假設不為 all 時，回傳空字串
        return newtodos;
        } else if (this.visibility == 'completed'){
          let newtodos = [];
          this.todos.forEach(item => {
            if (item.completed) {    //  item.completed = true checkbox被勾選
               newtodos.push(item);
            }  
          });
        return newtodos;
       }
      },
    },
});

