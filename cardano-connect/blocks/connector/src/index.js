import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import metadata from './block.json';
import PluginIcon from "../../shared/components/PluginIcon";

registerBlockType( metadata.name, {
	edit: Edit,
	icon: {
		src: <PluginIcon />,
	},
} );
