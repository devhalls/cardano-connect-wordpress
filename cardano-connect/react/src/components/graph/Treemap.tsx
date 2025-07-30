import React, {useCallback, useMemo, useRef, useState} from "react";
import * as d3 from "d3";
import {classMap} from "../../library/utils";
declare type ToolTipType = d3.HierarchyRectangularNode<GraphTreeNode<PoolData>>

export const Treemap = ({
    width,
    height,
    data,
    color = '#69b3a2',
    barSpacing = 4,
    ToolTip,
}: GraphTreemapComponent<PoolData>) => {

    // Local State

    const hierarchy = useMemo(() => {
        return d3.hierarchy(data).sum((d) => d.value);
    }, [data]);

    const root = useMemo(() => {
        const treeGenerator = d3.treemap<GraphTreeNode<PoolData>>().size([width, height]).padding(barSpacing);
        return treeGenerator(hierarchy);
    }, [hierarchy, width, height, barSpacing]);

    const graphContainer = useRef<HTMLDivElement>(null)
    const tooltipContainer = useRef<HTMLDivElement>(null)
    const [plotToolTip, setPlotToolTip] = useState<ToolTipType|null>(null)
    const [tooltipPosition, setTooltipPosition] = useState<{x: number; y: number}>({x: 0, y: 0})

    const handleClick = useCallback((leaf: ToolTipType, x: number, y: number) => {
        const containerHeight = graphContainer.current.offsetHeight
        const tooltipHeight = tooltipContainer.current.offsetHeight
        const containerWidth = graphContainer.current.offsetWidth
        const tooltipWidth = tooltipContainer.current.offsetWidth
        let xLocal = x
        let yLocal = y
        if (x + tooltipWidth > containerWidth) {
            xLocal = containerWidth - tooltipWidth - barSpacing * 2
        }
        if (y + tooltipHeight > containerHeight) {
            yLocal = containerHeight - tooltipHeight - barSpacing * 2
        }
        setTooltipPosition({
            x: xLocal,
            y: yLocal,
        })
        setPlotToolTip(leaf)
    }, [graphContainer, tooltipContainer, barSpacing])

    const getRectangles = root.leaves().map((leaf) => {
        const visibleText = leaf.x1 - leaf.x0 > 120 && leaf.y1 - leaf.y0 > 100
        return (
            <g key={leaf.id}>
                <rect
                    x={leaf.x0}
                    y={leaf.y0}
                    width={leaf.x1 - leaf.x0}
                    height={leaf.y1 - leaf.y0}
                    stroke={leaf.data.stroke || color}
                    fill={leaf.data.fill || color}
                    fillOpacity={leaf.data.fillOpacity || 0.2}
                    strokeWidth={leaf.data.strokeWidth || 1}
                    onClick={() => handleClick(leaf, leaf.x0, leaf.y0)}
                />
                {visibleText ? (
                    <>
                        <text
                            x={leaf.x0 + 3}
                            y={leaf.y0 + 3}
                            fontSize={12}
                            textAnchor="start"
                            alignmentBaseline="hanging"
                            fill={leaf.data.stroke || color}
                        >
                            {leaf.data.value}
                        </text>
                        <text
                            x={leaf.x0 + 3}
                            y={leaf.y0 + 16}
                            fontSize={12}
                            textAnchor="start"
                            alignmentBaseline="hanging"
                            fill={leaf.data.stroke || color}
                        >
                            {leaf.data.data.metadata.ticker}
                        </text>
                    </>
                ) : null}
            </g>
        )
    })

    return (
        <div ref={graphContainer} className={classMap.graphContainer}>
            <svg width={width} height={height}>
                {getRectangles}
            </svg>
            <div ref={tooltipContainer} className={classMap.plotContainer}
                 style={{
                     opacity: plotToolTip ? 1 : 0,
                     pointerEvents: plotToolTip ? 'initial' : 'none',
                     top: tooltipPosition.y,
                     left: tooltipPosition.x
                 }}>
                <ToolTip plot={plotToolTip?.data} hide={() => setPlotToolTip(null)}/>
            </div>
        </div>
    )
}