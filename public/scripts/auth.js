document.onload = fetch('/login').then(res => console.log(res)).catch(err => console.error(err));

function signup(){
    BootstrapDialog.show({
        message: function(dialogRef){
            var $form = $('<form></form>');
            var $titleDrop = $(` 
            <div class="form-group">
            <label for="name">Name:</label>
            <input type="name" name="name" class="form-control" id="name">
            <label for="email">Email address:</label>
            <input type="email" name="email" class="form-control" id="email">
            <label for="pwd">Password:</label>
            <input type="password" name="password" class="form-control" id="pwd">  
            <label for="address">Address:</label>
            <input type="address" name="address" class="form-control" id="address">
            <label for="phone">Phone:</label>
            <input type="phone" name="phone" class="form-control" id="phone">
            </div>
            `);
            dialogRef.setData('fieldTitleDrop', $form);
            $form.append($titleDrop);
            return $form;
        }        ,
        buttons: [
            {
            label: 'Confirm',
            action: function(dialogRef){
                var unindexed_array = dialogRef.getData('fieldTitleDrop').serializeArray();
                var indexed_array = {};
                $.map(unindexed_array, function(n, i){
                    indexed_array[n['name']] = n['value'];
                });
                
                fetch('/signup', {
                    method: 'POST', // or 'PUT'
                    body: JSON.stringify(indexed_array), 
                    headers: new Headers({
                      'Content-Type': 'application/json'
                    })
                  });

                dialogRef.close();
            }
            },
            {
            label: 'Cancel',
            action: function(dialogRef) {
                dialogRef.close();
            }
        }]
    });
}

function login(){
    BootstrapDialog.show({
        message: function(dialogRef){
            var $form = $('<form></form>');
            var $titleDrop = $(` 
            <div class="form-group">
            <label for="email">Email address:</label>
            <input type="email" name="email" class="form-control" id="email">
            <label for="pwd">Password:</label>
            <input type="password" name="password" class="form-control" id="pwd">
            </div>
            `);
            dialogRef.setData('fieldTitleDrop', $form);
            $form.append($titleDrop);
            return $form;
        }        ,
        buttons: [
            {
            label: 'Confirm',
            action: function(dialogRef){
                var unindexed_array = dialogRef.getData('fieldTitleDrop').serializeArray();
                var indexed_array = {};
                $.map(unindexed_array, function(n, i){
                    indexed_array[n['name']] = n['value'];
                });
                
                fetch('/login', {
                    method: 'POST', // or 'PUT'
                    body: JSON.stringify(indexed_array), 
                    headers: new Headers({
                      'Content-Type': 'application/json'
                    })
                  })
                  .then((err, res) => console.log(err, res))
                  .catch(err => console.error("Login failed"));

                dialogRef.close();
            }
            },
            {
            label: 'Cancel',
            action: function(dialogRef) {
                dialogRef.close();
            }
        }]
    });
}