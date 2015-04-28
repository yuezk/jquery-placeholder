// jQuery placeholder
(function ($) {
    var test = document.createElement('input');
    var support = 'placeholder' in test && !/android/gi.test(window.navigator.userAgent);

    $.fn.placeholder = function () {
        return this.each(function () {
            if (support) return;

            var $this = $(this);
            var holderText = $this.attr('placeholder');
            var holder = $('<div class="x-placeholder">' + holderText + '</div>');

            holder.css({
                position: 'absolute',
                display: 'none',
                zIndex: 999,
                cursor: 'text',
                wordWrap: 'break-word',
                color: '#bbb'
            });

            $this.after(holder)
                .removeAttr('placeholder')
                .parent().css('position', 'relative');

            $this.bind('focus', function () {
                holder.hide();
            }).bind('blur', function () {
                if ($this.val().length) return;

                var offset = $this.offset();
                var top;
                var left;
                var height;

                top = (parseInt($this.css('paddingTop'), 10) || 0) + (parseInt($this.css('borderTop'), 10) || 0);
                left = (parseInt($this.css('paddingLeft'), 10) || 0) + (parseInt($this.css('borderLeft'), 10) || 0);

                holder.css({
                    top: top,
                    left: left,
                    width: $this.width()
                }).show(); 

                if ($this.is('input')) {
                    height = $this.height();

                    holder.css({
                        height: height,
                        lineHeight: height + 'px'
                    });  
                }

            }).trigger('blur');

            holder.bind('click', function () {
                $this.focus();
            });
        });
    };
})(jQuery);