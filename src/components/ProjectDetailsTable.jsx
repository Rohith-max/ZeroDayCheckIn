import React, { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/ProjectDetailsTable.css";
import CheckNoSvg from "../assets/svg/check-no.svg";
import CheckYesSvg from "../assets/svg/check-yes.svg";
import CheckYesState1Svg from "../assets/svg/check-yes-state1.svg";
import SaveAsDraftSvg from "../assets/svg/save-as-draft.svg";
import TransferWorkflowSvg from "../assets/svg/transfer-workflow.svg";
import SubmitButtonSvg from "../assets/svg/submit-button.svg";
import NoteSvg from "../assets/svg/note.svg";
import NoteContentSvg from "../assets/svg/note-content.svg";
import NoteContentCloseSvg from "../assets/svg/note-content-close.svg";

const ProjectDetailsTable = () => {
  const [selectedTools, setSelectedTools] = useState([]);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHelpDesk = (location.pathname || "").toLowerCase().includes("helpdesk");

  const toolsData = useMemo(() => (
    [
      { name: 'Git/GitColab', url: 'https://github.ub.samsung.net/' },
      { name: 'Git/GitColab', url: 'https://github.ub.samsung.net/' },
      { name: 'Perforce', url: 'https://github.ub.samsung.net/' },
      { name: 'Package Gerrit', url: 'https://github.ub.samsung.net/' },
      { name: 'PLM', url: 'https://github.ub.samsung.net/' },
      { name: 'M-ITS', url: 'https://github.ub.samsung.net/' }
    ]
  ), []);

  const allToolNames = useMemo(() => toolsData.map(t => t.name), [toolsData]);
  const isAllSelected = selectedTools.length > 0 && selectedTools.length === allToolNames.length;

  const toggleTool = (toolName) => {
    if (isDraftSaved) return; // locked state
    setSelectedTools(prev => 
      prev.includes(toolName) 
        ? prev.filter(tool => tool !== toolName)
        : [...prev, toolName]
    );
  };

  const handleSubmit = () => {
    setIsDraftSaved(true); // Move to next state (locked state)
  };

  const toggleSelectAll = () => {
    if (isDraftSaved) return;
    setSelectedTools(prev => isAllSelected ? [] : [...allToolNames]);
  };

  return (
    <div className="project-details-table">
      <div className="title-with-note">
        <h2 className="project-details-title">Project Details</h2>
        <button
          type="button"
          className="note-button"
          aria-label={showNote ? "Hide note" : "Show note"}
          onClick={() => setShowNote((v) => !v)}
        >
          <img src={NoteSvg} alt="Note" />
        </button>

        {showNote && (
          <div className="note-tooltip" role="dialog" aria-label="Note tooltip">
            <img src={NoteContentSvg} alt="Note content" className="note-tooltip-content" />
            <button
              type="button"
              className="note-tooltip-close"
              aria-label="Close note"
              onClick={() => setShowNote(false)}
            >
              <img src={NoteContentCloseSvg} alt="Close" />
            </button>
          </div>
        )}
      </div>
      
      <table className="table project-details-info-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Gen ID</th>
            <th>Knox Email ID</th>
            <th>Joining Date</th>
            <th>Department</th>
            <th>RM Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Somashree Nandy</td>
            <td>23517968</td>
            <td>s.nandy@samsung.com</td>
            <td>29-Aug-2023</td>
            <td>29-Aug-2023</td>
            <td>s.nandy@samsung.com</td>
          </tr>
        </tbody>
      </table>

      {/* Save as Draft SVG (non-interactive), hidden once moved to next state */}
      <div className="draft-icon-right">
        {!isDraftSaved && (
          <img src={SaveAsDraftSvg} alt="Save as Draft" />
        )}
      </div>

      <h2 className="project-details-title select-tools-title">Select Required Tools</h2>
      
      <table className="table tools-table">
        <thead>
          <tr>
            <th style={{ width: '40px' }}>
              <button
                className="checkbox-button"
                onClick={toggleSelectAll}
                aria-label={isAllSelected ? 'Unselect all tools' : 'Select all tools'}
                disabled={isDraftSaved}
              >
                <img
                  src={isAllSelected ? (isHelpDesk ? CheckYesSvg : (isDraftSaved ? CheckYesSvg : CheckYesState1Svg)) : CheckNoSvg}
                  alt={isAllSelected ? 'Checked' : 'Unchecked'}
                  width="16"
                  height="16"
                />
              </button>
            </th>
            <th>SCM Tools</th>
            <th>URL</th>
            <th>Permission request URL</th>
            <th>To Be Requested by</th>
            <th>RM Remarks</th>
            {isHelpDesk && <th>IT remarks</th>}
          </tr>
        </thead>
        <tbody>
          {toolsData.map((tool, index) => (
            <tr key={index}>
              <td>
                <button 
                  className="checkbox-button" 
                  disabled={isDraftSaved}
                  onClick={() => toggleTool(tool.name)}
                  aria-label={selectedTools.includes(tool.name) ? 'Uncheck tool' : 'Check tool'}
                >
                  <img 
                    src={selectedTools.includes(tool.name) 
                      ? (isHelpDesk ? CheckYesSvg : (isDraftSaved ? CheckYesSvg : CheckYesState1Svg))
                      : CheckNoSvg} 
                    alt={selectedTools.includes(tool.name) ? "Checked" : "Unchecked"}
                    width="16"
                    height="16"
                  />
                </button>
              </td>
              <td>{tool.name}</td>
              <td><a href={tool.url}>{tool.url}</a></td>
              <td><a href={tool.url}>{tool.url}</a></td>
              <td>Maintainer Will Enable</td>
              <td>Please give access to the above...</td>
              {isHelpDesk && (<td>xxx-xxx-xxx-xxxx-</td>)}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="rm-remarks">
        <h2 className="project-details-title">RM General Remarks</h2>
        <p className={isDraftSaved ? 'locked' : ''}>Please give access to the above selected items.</p>
      </div>

      {isHelpDesk && (
        <div className="it-remarks">
          <h2 className="project-details-title">IT General Remarks</h2>
          <textarea
            placeholder="Please give access to the above selected items."
            readOnly={isDraftSaved}
            className={isDraftSaved ? 'locked' : ''}
          />
        </div>
      )}

      <div className="comment-box">
        <h2 className="project-details-title">Comment (Max 500 Chars)</h2>
        <textarea 
          maxLength={500} 
          placeholder="XXX-XXX-XX-XX-X" 
          readOnly={isDraftSaved} 
          className={isDraftSaved ? 'locked' : ''}
        />
      </div>

      {/* Submit triggers next state (lock) and is hidden afterwards */}
      <div className="submit-svg">
        {!isDraftSaved && (
          <button className="submit-svg-button" onClick={handleSubmit} aria-label="Submit">
            <img src={SubmitButtonSvg} alt="Submit" />
          </button>
        )}
      </div>

      {/* Transfer workflow is hidden when draft is saved */}
      <div className="transfer-workflow">
        {!isDraftSaved && (
          <img src={TransferWorkflowSvg} alt="Transfer Workflow" />
        )}
      </div>

      {/* View Policies inside inner-container, 48px below transfer workflow */}
      <div className="view-policies-link">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_124_23135_inline"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="20"
            height="20"
          >
            <path d="M0 0H20V20H0V0Z" fill="white" />
          </mask>
          <g mask="url(#mask0_124_23135_inline)">
            <path
              d="M16.875 8.65039V16.2578C16.875 16.9481 16.6309 17.5374 16.1428 18.0256C15.6546 18.5137 15.0653 18.7578 14.375 18.7578H5.625C4.93464 18.7578 4.34539 18.5137 3.85723 18.0256C3.36908 17.5374 3.125 16.9481 3.125 16.2578V3.75781C3.125 3.06746 3.36908 2.4782 3.85723 1.99005C4.34539 1.50189 4.93464 1.25781 5.625 1.25781H9.48242C9.73104 1.25785 9.97017 1.30543 10.1998 1.40055C10.4294 1.49567 10.6321 1.6311 10.8079 1.80684L16.3259 7.32485C16.5017 7.50066 16.6372 7.70338 16.7323 7.93301C16.8274 8.16265 16.8749 8.40184 16.875 8.65039ZM15.625 8.65049C15.625 8.56763 15.6091 8.48793 15.5774 8.41139C15.5457 8.33485 15.5006 8.2673 15.442 8.20874L9.92412 2.69082C9.86553 2.63224 9.79797 2.5871 9.72142 2.55539C9.64487 2.52369 9.56521 2.50783 9.48242 2.50781H5.625C5.27982 2.50781 4.98519 2.62985 4.74112 2.87393C4.49704 3.118 4.375 3.41263 4.375 3.75781V16.2578C4.375 16.603 4.49704 16.8976 4.74112 17.1417C4.98519 17.3858 5.27982 17.5078 5.625 17.5078H14.375C14.7202 17.5078 15.0148 17.3858 15.2589 17.1417C15.503 16.8976 15.625 16.603 15.625 16.2578V8.65049Z"
              fill="#606060"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 1.57031C9.65482 1.57031 9.375 1.85014 9.375 2.19531V6.88281C9.375 7.40058 9.55806 7.84252 9.92417 8.20864C10.2903 8.57476 10.7322 8.75781 11.25 8.75781H15.9375C16.2827 8.75781 16.5625 8.47798 16.5625 8.13281C16.5625 7.78764 16.2827 7.50781 15.9375 7.50781H11.25C11.0774 7.50781 10.9301 7.44679 10.8081 7.32475C10.686 7.20271 10.625 7.0554 10.625 6.88281V2.19531C10.625 1.85014 10.3452 1.57031 10 1.57031ZM6.25 11.2578C6.25 11.603 6.52983 11.8828 6.875 11.8828H13.125C13.4702 11.8828 13.75 11.603 13.75 11.2578C13.75 10.9126 13.4702 10.6328 13.125 10.6328H6.875C6.52983 10.6328 6.25 10.9126 6.25 11.2578ZM6.25 14.3828C6.25 14.728 6.52983 15.0078 6.875 15.0078H13.125C13.4702 15.0078 13.75 14.728 13.75 14.3828C13.75 14.0376 13.4702 13.7578 13.125 13.7578H6.875C6.52983 13.7578 6.25 14.0376 6.25 14.3828Z"
              fill="#606060"
            />
          </g>
        </svg>
        <span>View Policies</span>
      </div>
    </div>
  );
};

export default ProjectDetailsTable;
