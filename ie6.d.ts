export {}

declare global {
    interface Window {
        DOMParser?: DOMParser
        ActiveXObject?: ActiveXObject
    }

    interface Document {
        selection?: { empty(): void }
    }
}
