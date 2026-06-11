/**
 * Admin JS file
 */
(function($){

    const trigger_cron_trigger = '#wpcc-trigger-cron';
    const message_element = document.getElementById('wpcc-trigger-message');
    const sync_pool_loader = 'Loading...';
    const copy_label = 'Click to copy';
    const copied_label = 'Copied!';

    $(document).on('click', trigger_cron_trigger, function(e)
    {
        e.preventDefault();
        trigger_cron(e.target);
    });

    $(document).on('click', '.wpcc-code-copy', function(e) {
        e.preventDefault();
        const $button = $(this);
        const text = $button.data('copy') || $button.text();

        const onCopied = () => {
            $button.addClass('is-copied');
            const originalTitle = $button.attr('title') || copy_label;
            $button.attr('title', copied_label);
            window.setTimeout(() => {
                $button.removeClass('is-copied');
                $button.attr('title', originalTitle);
            }, 2000);
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(onCopied);
            return;
        }

        const $temp = $('<textarea>');
        $('body').append($temp);
        $temp.val(text).select();
        document.execCommand('copy');
        $temp.remove();
        onCopied();
    });

    function trigger_cron(target) {
        const html = target.innerHTML;
        if (html === sync_pool_loader) {
            return;
        }
        message_element.innerHTML = ''
        message_element.className = ''
        target.innerHTML = sync_pool_loader
        $.post('/wp-admin/admin-ajax.php', {
            'action': 'cardano_connect_cron'
        }, data => {
            target.innerHTML = html
            message_element.innerHTML = data
            message_element.className = `wpcc-section wpcc-section-small wpcc-section-${data.includes('success') ? 'success' : 'error'}`
        });
    }

})(jQuery);