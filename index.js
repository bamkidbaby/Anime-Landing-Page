 // single small jQuery script — delegated and DRY
    $(function(){
      const $dateModal = $('#dateModal');
      const $chatModal = $('#chatModal');
      const $downloadModal = $('#downloadModal');

      // open/close modals
      $('[data-open]').on('click', e => {
        const tgt = $($(e.currentTarget).data('open'));
        tgt.css('display','flex').attr('aria-hidden','false');
      });

      $('#dateCard').on('click', ()=> $dateModal.css('display','flex').attr('aria-hidden','false'));
      $('#chatCard, .tab-chat, #openRight').on('click', ()=> $chatModal.css('display','flex').attr('aria-hidden','false'));

      // close buttons (data-close)
      $('[data-close]').on('click', function(){ $(this).closest('.modal-backdrop').hide().attr('aria-hidden','true'); });

      // clicking backdrop closes
      $('.modal-backdrop').on('click', function(e){ if(e.target === this) $(this).hide().attr('aria-hidden','true'); });

      // menu toggle for mobile: show built-in left/right panels using simple class toggles
      $('#menuToggle').on('click', function(){
        // show left panel on small screens by temporarily toggling CSS display
        const $left = $('.left-panel');
        if ($left.is(':visible')) $left.hide(); else $left.show();
      });

      // play button (example behavior)
     /* $('#playBtn').on('click', function(){
        alert('Play pressed — replace with actual player logic');
      });*/

      // chat send — append message
      $('#sendMsg').on('click', function(){
        const txt = $('#chatInput').val().trim();
        if(!txt) return;
        $('<div/>',{class:'msg user',text:txt}).appendTo('#chatModal .chat-body');
        $('#chatInput').val('');
        // scroll
        $('#chatModal .chat-body').scrollTop(1e9);
      });

      // bounce + download modal (shared handler)
      function triggerDownload($el){
        const $icon = $el.find('i').first();
        $icon.addClass('bounce');
        setTimeout(()=> {
          $icon.removeClass('bounce');
          $downloadModal.css('display','flex').attr('aria-hidden','false');
          setTimeout(()=> $downloadModal.hide().attr('aria-hidden','true'), 1400);
        }, 900);
      }

      $('#downloadBtn').on('click', ()=> triggerDownload($('#downloadBtn')));
      $('#chatDownload').on('click', ()=> triggerDownload($('#chatDownload')));

      // small enhancement: close left/right panels when resizing to desktop (cleanup)
      $(window).on('resize', function(){
        if($(window).width() >= 900){
          $('.left-panel, .right-panel').show();
        } else {
          $('.left-panel, .right-panel').hide();
        }
      }).trigger('resize');
    });