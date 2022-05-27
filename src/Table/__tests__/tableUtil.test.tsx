import { render } from "@testing-library/react";
import { getSortBySVG } from "../tableUtil"

const defaultColumn = {
    disableSortBy: true,
    isSorted: true,
    isSortedDesc: true
}

describe('tableUtil', () => {
    it('returns null when disableSortBy is truthy', () => {

        const result = getSortBySVG(defaultColumn)

        expect(result).toBeNull();
    })

    it('returns the SVG when disableSortBy is falsy', () => {

        const { container } = render(<>{getSortBySVG({ ...defaultColumn, disableSortBy: false })}</>)

        expect(container.querySelector('svg.sort-icon')).toBeInTheDocument()
    })

    it('returns the arrow-up svg when column is sorted in ascending order', () => {

        const { container } = render(<>{getSortBySVG({ ...defaultColumn, disableSortBy: false, isSortedDesc: false })}</>)

        expect(container.querySelector('svg[aria-label="arrow-up"]')).toBeInTheDocument()
    })

    it('returns arrow-down svg when column is sorted in descending order', () => {

        const { container } = render(<>{getSortBySVG({ ...defaultColumn, disableSortBy: false, isSortedDesc: true })}</>)

        expect(container.querySelector('svg[aria-label="arrow-down"]')).toBeInTheDocument()
    })

    it('returns the unsorted svg when column isSorted is falsy', () => {

        const { container } = render(<>{getSortBySVG({ ...defaultColumn, disableSortBy: false, isSorted: false })}</>)

        expect(container.querySelector('svg[aria-label="unsorted-icon"]')).toBeInTheDocument()
    })
})
