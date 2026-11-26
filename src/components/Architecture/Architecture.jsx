import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaArrowDown, FaArrowRight, FaPlay, FaRotateRight } from 'react-icons/fa6';
import { PROFILE } from '../../data/profile';
import { TechIcon } from '../../utils/techIcons';
import { triggerTapRipple } from '../../utils/tapRipple';
import './Architecture.css';

export default function Architecture({ prefersReducedMotion }) {
  const { architecture } = PROFILE;
  const nodes = architecture.nodes;

  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, amount: 0.2 });

  const [litCount, setLitCount] = useState(prefersReducedMotion ? nodes.length : 0);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [packetIndex, setPacketIndex] = useState(prefersReducedMotion ? nodes.length - 1 : -1);
  const [traceRunKey, setTraceRunKey] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setLitCount(nodes.length);
      setSelectedIdx(nodes.length - 1);
      setPacketIndex(nodes.length - 1);
      return;
    }
    if (!inView && traceRunKey === 0) return;

    setLitCount(1);
    setSelectedIdx(0);
    setPacketIndex(0);

    const timers = [];
    for (let i = 1; i < nodes.length; i++) {
      timers.push(
        setTimeout(() => {
          setLitCount(i + 1);
          setSelectedIdx(i);
          setPacketIndex(i);
        }, i * 360)
      );
    }

    return () => timers.forEach(clearTimeout);
  }, [inView, traceRunKey, nodes.length, prefersReducedMotion]);

  const activeNode = nodes[selectedIdx] || nodes[0];

  const handleReplay = (e) => {
    triggerTapRipple(e);
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
            Client → REST API → Spring Security (JWT) → Service → Spring Data JPA → MySQL. Tap any
            node to inspect layer responsibilities or replay the data packet trace.
          </p>
        </motion.div>

        <div ref={containerRef} className="arch__board">
          <div className="arch__toolbar">
            <div className="arch__endpoint mono">
              <span className="arch__method">POST</span>
              <span className="arch__path">/api/v1/orders</span>
              <span className="arch__auth-pill">{architecture.authHeaderSample}</span>
            </div>

            <button
              type="button"
              className="btn btn-secondary arch__replay-btn ripple-host"
              onClick={handleReplay}
              disabled={prefersReducedMotion}
              title="Replay animated request pipeline"
            >
              {traceRunKey > 0 ? <FaRotateRight aria-hidden="true" /> : <FaPlay aria-hidden="true" />}
              <span>Trace Packet</span>
            </button>
          </div>

          <div className="arch__pipeline" role="list" aria-label="Backend request flow stages">
            {nodes.map((node, index) => {
              const isLit = index < litCount;
              const isSelected = index === selectedIdx;
              const isSecurity = node.id === 'security';
              const hasActivePacket = packetIndex === index;

              return (
                <div key={node.id} className="arch__step-wrapper" role="listitem">
                  <button
                    type="button"
                    onClick={(e) => {
                      triggerTapRipple(e);
                      setSelectedIdx(index);
                    }}
                    className={[
                      'arch__node ripple-host',
                      isLit ? 'arch__node--lit' : '',
                      isSelected ? 'arch__node--selected' : '',
                      isSecurity ? 'arch__node--security' : '',
                      hasActivePacket ? 'arch__node--packet' : '',
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
                      {index + 1 <= litCount && !prefersReducedMotion && (
                        <span
                          className={`arch__packet ${
                            index + 1 === packetIndex ? 'arch__packet--moving' : ''
                          }`}
                        />
                      )}
                      <span className="arch__connector-arrow arch__connector-arrow--down">
                        <FaArrowDown size={11} />
                      </span>
                      <span className="arch__connector-arrow arch__connector-arrow--right">
                        <FaArrowRight size={11} />
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

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
