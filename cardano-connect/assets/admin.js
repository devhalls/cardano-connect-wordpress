/**
 * Admin JS file
 */
(function($){

    const trigger_cron_trigger = '#wpcc-trigger-cron';
    const message_element = document.getElementById('wpcc-trigger-message');
    const sync_pool_loader = 'Loading...';

    $(document).on('click', trigger_cron_trigger, function(e)
    {
        e.preventDefault();
        trigger_cron(e.target);
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