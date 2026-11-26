import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaCircleInfo, FaKey, FaTerminal } from 'react-icons/fa6';
import { PROFILE } from '../../data/profile';
import { triggerTapRipple } from '../../utils/tapRipple';
import './CodingLab.css';

export default function CodingLab({ prefersReducedMotion }) {
  const { codingLab } = PROFILE;
  const [activeId, setActiveId] = useState(codingLab.endpoints[0].id);

  const activeEndpoint = useMemo(
    () => codingLab.endpoints.find((ep) => ep.id === activeId) || codingLab.endpoints[0],
    [activeId, codingLab.endpoints]
  );

  return (
    <section id="coding-lab" className="section coding-lab">
      <div className="container">
        <motion.div
          className="section-header"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
        >
          <span className="section-kicker">05 // INTERACTIVE API LAB</span>
          <h2 className="section-title">REST Endpoint &amp; JWT Inspector</h2>
          <p className="section-subtitle">
            Inspect request payloads, Spring Boot JSON responses, and role-scoped JWT structures
            modeled after the E-Commerce Management System.
          </p>
        </motion.div>

        <div className="lab-shell">
          {/* Demo Notice Banner */}
          <div className="lab-banner mono">
            <div className="lab-banner__left">
              <span className="lab-dots" aria-hidden="true">
                <span className="lab-dot lab-dot--red" />
                <span className="lab-dot lab-dot--amber" />
                <span className="lab-dot lab-dot--green" />
              </span>
              <span className="lab-demo-badge">
                <FaCircleInfo size={12} aria-hidden="true" />
                <span>{codingLab.demoNotice}</span>
              </span>
            </div>
          </div>

          {/* Endpoint Tabs */}
          <div className="lab-tabs" role="tablist" aria-label="API demonstration endpoints">
            {codingLab.endpoints.map((ep) => {
              const active = ep.id === activeEndpoint.id;
              return (
                <button
                  key={ep.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={`lab-tab mono ripple-host ${active ? 'lab-tab--active' : ''}`}
                  onClick={(e) => {
                    triggerTapRipple(e);
                    setActiveId(ep.id);
                  }}
                >
                  <span
                    className={`lab-method lab-method--${ep.method.toLowerCase()}`}
                  >
                    {ep.method}
                  </span>
                  <span>{ep.path}</span>
                </button>
              );
            })}
          </div>

          {/* Endpoint Summary Bar */}
          <div className="lab-endpoint-bar">
            <p className="lab-endpoint-summary">{activeEndpoint.summary}</p>
            <div className="lab-status-group mono">
              <span className="lab-status-code">{activeEndpoint.statusCode}</span>
              <span className="lab-latency">{activeEndpoint.latency}</span>
            </div>
          </div>

          {/* Three-panel Request / Response / JWT Preview */}
          <div className="lab-panels" role="tabpanel" aria-label={activeEndpoint.label}>
            <div className="lab-panel">
              <div className="lab-panel__head mono">
                <span>REQUEST</span>
                <span className="lab-panel__meta">
                  {activeEndpoint.method} {activeEndpoint.path}
                </span>
              </div>

              <div className="lab-headers mono">
                {activeEndpoint.requestHeaders.map((header) => (
                  <div key={header} className="lab-header-line">
                    {header}
                  </div>
                ))}
              </div>

              <pre className="lab-pre mono">
                <code>{activeEndpoint.requestBody}</code>
              </pre>
            </div>

            <div className="lab-panel">
              <div className="lab-panel__head mono">
                <span>JSON RESPONSE (DEMO)</span>
                <span className="lab-panel__status">{activeEndpoint.statusCode}</span>
              </div>

              <pre className="lab-pre mono">
                <code>{activeEndpoint.responseBody}</code>
              </pre>
            </div>

            <div className="lab-panel lab-panel--jwt">
              <div className="lab-panel__head mono">
                <span className="lab-jwt-title">
                  <FaKey size={12} aria-hidden="true" />
                  <span>GENERATED JWT PREVIEW (DEMO)</span>
                </span>
                <span className="lab-panel__meta">HS256</span>
              </div>

              <div className="lab-jwt-token mono" aria-label="Sample color-coded JWT string">
                <span className="jwt-part jwt-part--header">{activeEndpoint.jwt.header}</span>
                <span className="jwt-dot">.</span>
                <span className="jwt-part jwt-part--payload">{activeEndpoint.jwt.payload}</span>
                <span className="jwt-dot">.</span>
                <span className="jwt-part jwt-part--sig">{activeEndpoint.jwt.signature}</span>
              </div>

              <div className="lab-jwt-decoded">
                <span className="lab-jwt-label mono">DECODED CLAIMS</span>
                <pre className="lab-pre lab-pre--compact mono">
                  <code>{activeEndpoint.jwt.decodedClaims}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Maven Build Status Footer */}
          <div className="lab-footer mono">
            <div className="lab-footer__cmd">
              <FaTerminal size={12} aria-hidden="true" />
              <span>$ mvn test</span>
            </div>
            <div className="lab-footer__pass">
              <FaCheck size={12} aria-hidden="true" />
              <span>{codingLab.mvnOutput}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
