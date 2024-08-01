import { cleanup, prettyDOM, render, screen } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";

import App from '../../src/App.svelte'

describe('Mounting tests', () => {
    afterEach(() => cleanup());

    it('should be able to mount the component without any data', () => {
        const container = render(App);
        expect(container).toBeTruthy();
    });

    it('should be able to mount the component with a working path', async () => {
        render(App, {path: ''});
        const container = screen.getByTestId('TEI-container');
        expect(container).toBeTruthy();
    })
})