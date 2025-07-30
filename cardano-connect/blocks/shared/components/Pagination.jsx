import {__} from "@wordpress/i18n";

export default function Pagination(attributes) {
    return (
        <div className={'wpcc-pagination'}>
            <span className={'wpcc-number'}>{__('Page 1 / ')}{attributes.per_page || __('all')}</span>
            <span className={'wpcc-prev'}>{__('Prev')}</span>
            <span className={'wpcc-next'}>{__('Next')}</span>
        </div>
    )
}