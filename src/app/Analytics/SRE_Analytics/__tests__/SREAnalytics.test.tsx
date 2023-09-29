
import '@testing-library/jest-dom/extend-expect'
import { SREAnalytics } from "../SREAnalytics"
import { render, fireEvent } from "@app/Utils/testUtils"
import React from 'react'

describe('SRE analytics', () => {
    it("should check for usecase selection tab open by default", () => {
        const comp = render(<SREAnalytics />)
        expect(comp.queryByText("Analytics - SRE View")).toBeInTheDocument()
        expect(comp.getByRole('tab', {name: "UseCase Selections"})).toHaveAttribute("aria-selected", "true")
        expect(comp.getByRole('tab', {name: "Recommendations"})).toHaveAttribute("aria-selected", "false")
    })

    it("should check usecase dropdown values",() => {
        const comp = render(<SREAnalytics />)
        expect(comp.queryByText("UseCase Selection")).toBeInTheDocument()
        expect((comp.getByText('Select one') as HTMLOptionElement).selected).toBeTruthy();
        fireEvent.change(comp. getByTestId('select'), { target: { value: "Monitoring" } })
        expect((comp.getByText('Monitoring') as HTMLOptionElement).selected).toBeTruthy();
    })
})