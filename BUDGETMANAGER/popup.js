$(function () {
    chrome.storage.sync.get('total', function (current){
        $('#total').text(current.total);
    });
    chrome.storage.sync.get('limit', function (currentLimit) {
        $('#limit').text(currentLimit.limit);
    });

    $("#spendAmount").click(function () {
        chrome.storage.sync.get(['total','limit'], function(current){
            var newTotal = 0;
            if(current.total){
                newTotal += parseInt(current.total);
            }
            var amount = $('#amount').val();
            if(amount){
                newTotal += parseInt(amount);
            }
            
            chrome.storage.sync.set({'total': newTotal}, function(){
                if((amount && newTotal >= current.limit){
                    var notifOptions = {
                        type: 'basic',
                        iconUrl: 'icon48.png',
                        title: 'Limit Reached!',
                        message: "You've reached your limit!",
                        
                    };
                    chrome.notifications.create('limitNotif', notifOptions);
                }
            });
            $('#total').text(newTotal);
            $('#amount').val('');

        });
    });
});