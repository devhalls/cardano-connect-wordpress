import React, {useEffect, useState} from 'react'
import {classMap} from "../../library/utils";
import {backendGetWordPressBlock} from "../../library";

export const Gated = ({
    gated,
    gatedPlaceholder,
    gate,
    className = '',
}: ComponentGated) => {
    const [error, setError] = useState<string | null>(null)
    const [gatedContent, setGatedContent] = useState<string | null>(null)
    const [gatedPlaceholderContent, setGatedPlaceholderContent] = useState<string | null>(null)
    const [passed, setPassed] = useState<boolean | null>(false)

    /**
     * Retrieve the placeholder content.
     */
    useEffect(() => {
        if (!gatedPlaceholder) {
            return
        }
        backendGetWordPressBlock({
            nonce: wpCardanoConnect?.nonce,
            slug: gatedPlaceholder
        })
            .then(res => {
                if (res.success) {
                    setGatedPlaceholderContent(res.data.html)
                    setPassed(res.data.passed)
                } else {
                    setError(res.message)
                }
            })
            .catch(res => setError(res.message))
    }, [gatedPlaceholder]);

    /**
     * Retrieve the gated content.
     */
    useEffect(() => {
        if (!gated) {
            return
        }
        backendGetWordPressBlock({
            nonce: wpCardanoConnect?.nonce,
            slug: gated
        })
            .then(res => {
                if (res.success) {
                    setGatedContent(res.data.html)
                    setPassed(res.data.passed)
                } else {
                    setError(res.message)
                }
            })
            .catch(res => setError(res.message))
    }, [gated]);

    return (
        <div className={`${classMap.gated} ${classMap.gated}-${gated} ${classMap.gated}-${gate} ${className}`}>
            {error ? (
                <div className={classMap.messageError}>{error}</div>
            ) : null}
            {!passed && gatedPlaceholderContent ? (
                <div className={classMap.gatedContent} dangerouslySetInnerHTML={{__html: gatedPlaceholderContent}}/>
            ) : null}
            {passed && gatedContent ? (
                <div className={classMap.gatedContent} dangerouslySetInnerHTML={{__html: gatedContent}}/>
            ) : null}
        </div>
    )
}
