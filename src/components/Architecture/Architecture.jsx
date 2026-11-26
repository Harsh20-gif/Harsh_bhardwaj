import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaArrowDown, FaArrowRight, FaPlay, FaRotateRight } from 'react-icons/fa6';
import { PROFILE } from '../../data/profile';
import { TechIcon } from '../../utils/techIcons';
import './Architecture.css';

export default function Architecture({ prefersReducedMotion }) {
  const { architecture } = PROFILE;
  const nodes = architecture.nodes;

  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, amount: 0.2 });

  const [litCount, setLitCount] = useState(prefersReducedMotion ? nodes.length : 0);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [traceRunKey, setTraceRunKey] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setLitCount(nodes.length);
      setSelectedIdx(nodes.length - 1);
      return;
    }
    if (!inView && traceRunKey === 0) return;

    setLitCount(1);
    setSelectedIdx(0);

    const timers = [];
    for (let i = 1; i < nodes.length; i++) {
      const t = setTimeout(() => {
        setLitCount(i + 1);
        setSelectedIdx(i);
      }, i * 380);
      timers.push(t);
    }

    return () => timers.forEach(clearTimeout);
  }, [inView, traceRunKey, nodes.length, prefersReducedMotion]);

  const activeNode = nodes[selectedIdx] || nodes[0];

  const handleReplay = () => {
    if (prefersReducedMotion) return;
    setTraceRunKey((k) => k + 1);
  };

  return (
    <section id="architecture" className="section arch">
      <div className="container">
        <motion.div
          className="section-header"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
        >
          <span className="section-kicker">04 // BACKEND REQUEST PIPELINE</span>
          <h2 className="section-title">System Architecture</h2>
          <p className="section-subtitle">
            End-to-end request lifecycle across my Spring Boot REST systems — from React client
            dispatch through stateless JWT authorization to transactional MySQL persistence.
          </p>
        </motion.div>

        <div ref={containerRef} className="arch__board">
          {/* Request Banner */}
          <div className="arch__toolbar">
            <div className="arch__endpoint mono">
              <span className="arch__method">POST</span>
              <span className="arch__path">/api/v1/orders</span>
              <span className="arch__auth-pill">{architecture.authHeaderSample}</span>
            </div>

            <button
              type="button"
              className="btn btn-secondary arch__replay-btn"
              onClick={handleReplay}
              disabled={prefersReducedMotion}
              title="Replay animated request pipeline"
            >
              {traceRunKey > 0 ? <FaRotateRight aria-hidden="true" /> : <FaPlay aria-hidden="true" />}
              <span>Trace Flow</span>
            </button>
          </div>

          {/* Pipeline Nodes */}
          <div className="arch__pipeline" role="list" aria-label="Backend request flow stages">
            {nodes.map((node, index) => {
              const isLit = index < litCount;
              const isSelected = index === selectedIdx;
              const isSecurity = node.id === 'security';

              return (
                <div key={node.id} className="arch__step-wrapper" role="listitem">
                  <button
                    type="button"
                    onClick={() => setSelectedIdx(index)}
                    className={[
                      'arch__node',
                      isLit ? 'arch__node--lit' : '',
                      isSelected ? 'arch__node--selected' : '',
                      isSecurity ? 'arch__node--security' : '',
                    ].join(' ')}
                    aria-pressed={isSelected}
                  >
                    <div className="arch__node-top mono">
                      <span className="arch__node-step">STAGE {node.step}</span>
                      <span className="arch__node-status" aria-hidden="true" />
                    </div>

                    <div className="arch__node-main">
                      <div className="arch__node-icon">
                        <TechIcon iconKey={node.iconKey} size={22} />
                      </div>
                      <div>
                        <h3 className="arch__node-title">{node.title}</h3>
                        <p className="arch__node-sub mono">{node.subtitle}</p>
                      </div>
                    </div>

                    <div className="arch__node-foot mono">
                      <span>{node.protocol}</span>
                      <span className="arch__node-badge">{node.badge}</span>
                    </div>
                  </button>

                  {index < nodes.length - 1 && (
                    <div
                      className={`arch__connector ${
                        index + 1 < litCount ? 'arch__connector--active' : ''
                      }`}
                      aria-hidden="true"
                    >
                      <span className="arch__connector-line" />
                      <span className="arch__connector-arrow arch__connector-arrow--down">
                        <FaArrowDown size={12} />
                      </span>
                      <span className="arch__connector-arrow arch__connector-arrow--right">
                        <FaArrowRight size={12} />
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Interactive Layer Inspector */}
          <div className="arch__inspector" aria-live="polite">
            <div className="arch__inspector-head mono">
              <span className="arch__inspector-label">
                INSPECTING STAGE {activeNode.step} // {activeNode.title.toUpperCase()}
              </span>
              <span className="arch__inspector-proto">{activeNode.protocol}</span>
            </div>

            <p className="arch__inspector-desc">{activeNode.description}</p>

            <div className="arch__inspector-code mono">
              <span className="arch__prompt">&gt;</span>
              <code>{activeNode.payload}</code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
