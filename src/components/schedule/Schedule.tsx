import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

function Schedule() {
    const docs = [
        {
            uri: require("../../files/Schedule.pdf"),
            fileType: "pdf",
            fileName: " "
        },
    ];
    return (
        <DocViewer
            pluginRenderers={DocViewerRenderers}
            documents={docs}
        />
    )

}

export default Schedule