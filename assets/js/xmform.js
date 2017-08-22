/**
 * Created by jsbfec on 17/3/18.
 */
$(function () {
   $(".next-step").on('click',function(){
       var $this=$(this);
       var index=$this.parents('.steps-item').index()+1;
      $('.steps-nav>.item').eq(index).addClass('active');
       $this.parents('.steps-item').hide().next('.steps-item').show();
   });
    $(".prev-step").on('click',function(){
        var $this=$(this);
        var index=$this.parents('.steps-item').index();
        $('.steps-nav>.item').eq(index).removeClass('active');
        $this.parents('.steps-item').hide().prev('.steps-item').show();

    })
});
