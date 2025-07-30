import {__} from "@wordpress/i18n";

export default function Title(attributes) {
    return (
        <div className={'wpcc-block-title'}>
            <div className={'wpcc-block-image'}></div>
            <div className={'wpcc-block-text'}>
                {__(attributes.title)}
            </div>
        </div>
    )
}