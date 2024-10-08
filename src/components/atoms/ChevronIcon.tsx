const ChevronIcon: React.FC<{ isExpanded: boolean }> = ({ isExpanded }) => (
    // <svg
    //   className={``}
    //   width="16"
    //   height="16"
    //   viewBox="0 0 16 16"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    // >
    //    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
    // </svg>

<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-chevron-right mt-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
</svg>
  );

  export default ChevronIcon