/**
 * Created by jsbfec on 2018/2/6.
 */
$(function(){
    $('.del').on('click',function(e){
        var target=$(e.target)
        var id= target.data('id')
        var tr=$('.item-id-'+id)
        console.log(tr)
        $.ajax({
            type:'DELETE',
            url:'/admin/list?id='+id
        }).done(function(results){
            console.log(results)
            if(results.success===1){
                var tr=$('.item-id-'+id)
                if(tr.length>0){
                    tr.remove()
                    console.log('remove')
                }
            }
        })
    })
})