 /* var typingTimer;
var doneTypingInterval = 3000;

    setTimer = () => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(this.updateFile, doneTypingInterval)
    }
     updateBody = (e) => {
        console.log(e.target.value);
        this.setState({body: e.target.value});
     }

         listFiles = () => {
        let _this = this;
        gapi.client.drive.files.list({
          'maxResults': 10
        }).then(function(response) {
          _this.appendPre('Files:');
          var files = response.result.items;
          if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              _this.appendPre(file.title + ' (' + file.id + ')');
            }
          } else {
            _this.appendPre('No files found.');
          }
        });
    }

       if (file.exportLinks['text/plain']) {
          var accessToken = gapi.auth.getToken().access_token;
          var xhr = new XMLHttpRequest();
          xhr.open('GET', file.exportLinks['text/plain']);
          xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
          xhr.onload = function() {
            _this.setState({body: xhr.responseText});
          };
          xhr.onerror = function() {
            console.log("error");
          };
          xhr.send();
        } else {
        }
*/

 /*{this.state.file_picker ? <GoogleFilePicker downloadFile={this.downloadFile.bind(this)}/> : ""}
       {this.state.body ?
       <div onClick={e => e.stopPropagation()}>
       <TextField
        defaultValue={this.state.body} onKeyDown={clearTimeout(typingTimer)}
        onKeyUp={this.setTimer} onChange={this.updateBody}
        hintText="MultiLine with rows: 2 and rowsMax: 4"
        multiLine={true}
        rows={5}
        rowsMax={5}
        />
       </div>
       :
       ""
       }*/
            /*sendXhrUpdate = (fileId, contentBlob) => {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.onreadystatechange = function() {
          if (xhr.readyState != XMLHttpRequest.DONE) {
            return;
          }
        };
        xhr.open('PATCH', 'https://www.googleapis.com/upload/drive/v3/files/' + fileId + '?uploadType=media');
        xhr.setRequestHeader('Authorization', 'Bearer ' + gapi.auth.getToken().access_token);
        xhr.send(contentBlob);
    }*/

    /*updateFile = () => {
        var docId = this.state.id;
        var content = this.state.body;
        var contentBlob = new  Blob([content], {
            'type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        });
        this.sendXhrUpdate(docId, contentBlob, function(response) {
            console.log(response);
        });
     }*/