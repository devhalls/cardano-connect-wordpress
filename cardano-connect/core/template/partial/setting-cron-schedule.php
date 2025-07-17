<?php
/**
 * @var WPCC\Settings $this
 */

$cron = _get_cron_array();
if (!$cron) {
	esc_html_e( "No cron events scheduled.", 'cardano-connect' );
	return;
}
?>
<div class="wpcc-section" id="cron-schedule">
	<h3><?php esc_html_e("Sync pools schedule", 'cardano-connect') ?></h3>
	<p><?php esc_html_e("This table displays the WordPress scheduled events list. Events related to the Cardano Connect plugin are highlighted in green.", 'cardano-connect') ?></p>
    <div class="wpcc-row">
        <table class="widefat">
            <thead>
                <tr>
                    <th><?php esc_html_e( "Hook", 'cardano-connect' ) ?></th>
                    <th><?php esc_html_e( "Next Run (UTC)", 'cardano-connect' ) ?></th>
                    <th><?php esc_html_e( "Description", 'cardano-connect' ) ?></th>
                </tr>
            </thead>
            <tbody>
            <?php
            foreach ($cron as $timestamp => $hooks) :
                foreach ($hooks as $hook => $events) :
                    $active = in_array($hook, ['cardano_connect_cron_fetch_data', 'cardano_connect_cron_fetch_data_batch']) ? $hook : false;
                    foreach ($events as $event) :
                        ?>
                        <tr class="<?php echo $active ? 'active' : 'inactive' ?>">
                            <td><?php esc_html_e($hook) ?></td>
                            <td><?php echo gmdate('Y-m-d H:i:s', $timestamp) ?></td>
                            <td>
	                            <?php if ($active === 'cardano_connect_cron_fetch_data') : ?>
		                            <?php esc_html_e( "Cardano Connect event - Starts the batch fetch process. After fetching the first batch this will schedule the chain cardano_connect_cron_fetch_data_batch until complete.", 'cardano-connect' ) ?>
	                            <?php elseif ($active === 'cardano_connect_cron_fetch_data_batch') : ?>
		                            <?php esc_html_e( "Cardano Connect event - Batch fetch process scheduled by a previous event in the chain. The batch number is detailed below.", 'cardano-connect' ) ?>
                                    <pre class="wpcc-pre"><?php esc_html_e(print_r($event['args'], true)) ?></pre>
	                            <?php elseif ($event['args']) : ?>
                                    <pre class="wpcc-pre"><?php esc_html_e(print_r($event['args'], true)) ?></pre>
	                            <?php else : ?>
                                    -
                                <?php endif ?>
                            </td>
                        </tr>
                        <?php
                    endforeach;
                endforeach;
            endforeach;
            ?>
            </tbody>
        </table>
    </div>
</div>
