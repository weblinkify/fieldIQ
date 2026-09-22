"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Brain,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Zap,
  ArrowRight,
  Sparkles,
  Search,
  Activity,
  Lightbulb,
} from "lucide-react";

import type { DashboardData } from "@/lib/types";

import {
  EmptyState,
  FilterSelect,
  PageHeader,
  RefreshButton,
  SearchBox,
  SimBadge,
  StatCard,
  StatusBadge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/management/management-ui";

const INSIGHTS = [
  {
    id: "insight-1",
    type: "optimization",
    title: "HVAC Energy Optimization Potential",
    description:
      "Temperature sensors in the North Wing show a consistent 3°C overlap between heating and cooling cycles during 2PM-5PM. Adjusting the deadband could save an estimated 14% in energy costs.",
    impact: "High",
    confidence: 94,
    icon: Zap,
  },
  {
    id: "insight-2",
    type: "anomaly",
    title: "Anomalous CO2 Spikes Detected",
    description:
      "Conference Room A experiences rapid CO2 saturation (exceeding 1000ppm) within 15 minutes of occupancy. Ventilation rate is insufficient for the detected room capacity.",
    impact: "Medium",
    confidence: 88,
    icon: AlertTriangle,
  },
  {
    id: "insight-3",
    type: "prediction",
    title: "Predictive Maintenance: Server Room AC",
    description:
      "Vibration patterns on cooling unit AC-04 indicate a failing bearing. The model predicts a 75% chance of critical failure within the next 14 days if unaddressed.",
    impact: "Critical",
    confidence: 75,
    icon: TrendingDown,
  },
  {
    id: "insight-4",
    type: "trend",
    title: "Improving Ambient Humidity",
    description:
      "Following the humidifier recalibration last week, the average ambient humidity in the East Lab has stabilized at 45% (±2%), well within the target range.",
    impact: "Low",
    confidence: 98,
    icon: TrendingUp,
  },
];

export default function AIInsightsPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [impact, setImpact] = useState("all");

  const fetchData = async (manual = false) => {
    try {
      if (manual) setRefreshing(true);

      const response = await fetch("/api/dashboard", {
        cache: "no-store",
      });

      const result = await response.json();

      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch AI insights:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();

    const interval = setInterval(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  /*
   * Keep the dashboard data available so this page follows
   * the same data-refresh pattern as the Devices page.
   *
   * The current insights are demo/generated insights, so they
   * don't require the API data yet.
   */
  const dashboardSites = data?.sites ?? [];

  const generatedInsights = useMemo(() => {
    return INSIGHTS.map((insight) => ({
      ...insight,
      siteCount: dashboardSites.length,
    }));
  }, [dashboardSites]);

  const filteredInsights = useMemo(() => {
    return generatedInsights.filter((insight) => {
      const query = search.toLowerCase();

      const matchesSearch =
        insight.title.toLowerCase().includes(query) ||
        insight.description.toLowerCase().includes(query) ||
        insight.type.toLowerCase().includes(query);

      const matchesType =
        type === "all" || insight.type === type;

      const matchesImpact =
        impact === "all" || insight.impact.toLowerCase() === impact;

      return matchesSearch && matchesType && matchesImpact;
    });
  }, [generatedInsights, search, type, impact]);

  const totalInsights = generatedInsights.length;

  const criticalInsights = generatedInsights.filter(
    (insight) => insight.impact === "Critical"
  ).length;

  const highImpactInsights = generatedInsights.filter(
    (insight) => insight.impact === "High"
  ).length;

  const averageConfidence =
    generatedInsights.length > 0
      ? Math.round(
        generatedInsights.reduce(
          (total, insight) => total + insight.confidence,
          0
        ) / generatedInsights.length
      )
      : 0;

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin text-brand-primary">
          <Activity size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="stagger-in">
      <PageHeader
        title="AI Insights"
        description="Machine learning analysis of your sensor data, identifying anomalies and optimization opportunities."
        action={
          <>
            <SimBadge />

            <div className="flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <Sparkles size={14} />
              Demo Analysis
            </div>

            <RefreshButton
              onClick={() => fetchData(true)}
              loading={refreshing}
            />
          </>
        }
      />

      {/* Stats */}
      <div className="stats-grid">
        <StatCard
          icon={<Lightbulb size={22} />}
          label="Total Insights"
          value={totalInsights}
          tone="brand"
        />

        <StatCard
          icon={<AlertTriangle size={22} />}
          label="Critical Insights"
          value={criticalInsights}
          tone="danger"
        />

        <StatCard
          icon={<Zap size={22} />}
          label="High Impact"
          value={highImpactInsights}
          tone="warning"
        />

        <StatCard
          icon={<Brain size={22} />}
          label="Avg. Confidence"
          value={`${averageConfidence}% `}
          tone="success"
        />
      </div>

      {/* AI Query */}
      <div
        style={{
          marginBottom: 24,
          padding: 20,
          borderRadius: 16,
          border: "1px solid var(--border-primary)",
          background: "var(--bg-secondary)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 14,
          }}
        >
          <div
            className="stat-icon brand"
            style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              flexShrink: 0,
            }}
          >
            <Brain size={20} />
          </div>

          <div style={{ flex: 1 }}>
            <div
              style={{
                fontWeight: 600,
                color: "var(--text-primary)",
                fontSize: 16,
              }}
            >
              Ask FieldIQ AI
            </div>

            <div
              style={{
                marginTop: 4,
                fontSize: 12,
                color: "var(--text-tertiary)",
              }}
            >
              Query your sensor data using natural language.
              AI analysis is simulated in this demo.
            </div>

            <div
              style={{
                position: "relative",
                marginTop: 14,
              }}
            >
              <Search
                size={16}
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-tertiary)",
                }}
              />

              <input
                type="text"
                placeholder="Ask something about your sensor data..."
                disabled
                style={{
                  width: "100%",
                  height: 40,
                  paddingLeft: 38,
                  paddingRight: 90,
                  borderRadius: 9,
                  border: "1px solid var(--border-primary)",
                  background: "var(--bg-tertiary)",
                  color: "var(--text-primary)",
                  fontSize: 12,
                  outline: "none",
                  opacity: 0.8,
                }}
              />

              <button
                disabled
                style={{
                  position: "absolute",
                  right: 5,
                  top: "50%",
                  transform: "translateY(-50%)",
                  height: 30,
                  padding: "0 12px",
                  borderRadius: 7,
                  border: "none",
                  background: "var(--color-brand)",
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 600,
                  opacity: 0.5,
                }}
              >
                Analyze
              </button>
            </div>

            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                marginTop: 10,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  color: "var(--text-tertiary)",
                }}
              >
                Suggested:
              </span>

              <button
                disabled
                style={{
                  border: 0,
                  background: "transparent",
                  padding: 0,
                  fontSize: 11,
                  color: "var(--color-brand)",
                  cursor: "pointer",
                }}
              >
                "Are there any anomalous readings right now?"
              </button>

              <button
                disabled
                style={{
                  border: 0,
                  background: "transparent",
                  padding: 0,
                  fontSize: 11,
                  color: "var(--color-brand)",
                  cursor: "pointer",
                }}
              >
                "Summarize energy usage trends"
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 16,
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Search insight, description, or type..."
        />

        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <FilterSelect value={type} onChange={setType}>
            <option value="all">All types</option>
            <option value="optimization">Optimization</option>
            <option value="anomaly">Anomaly</option>
            <option value="prediction">Prediction</option>
            <option value="trend">Trend</option>
          </FilterSelect>

          <FilterSelect value={impact} onChange={setImpact}>
            <option value="all">All impacts</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </FilterSelect>
        </div>
      </div>

      {/* Insights Table */}
      <Table>
        <TableHeader>
          <tr>
            <TableHead>Insight</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Impact</TableHead>
            <TableHead>Confidence</TableHead>
            <TableHead>Description</TableHead>
            <TableHead />
          </tr>
        </TableHeader>

        <TableBody>
          {filteredInsights.map((insight) => {
            const Icon = insight.icon;

            return (
              <TableRow key={insight.id}>
                <TableCell>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <div
                      className="stat-icon brand"
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={16} />
                    </div>

                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          fontSize: 13,
                        }}
                      >
                        {insight.title}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          marginTop: 3,
                          fontSize: 10,
                          color: "var(--text-tertiary)",
                        }}
                      >
                        <Brain size={11} />
                        AI generated
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <StatusBadge
                    tone={
                      insight.type === "anomaly"
                        ? "danger"
                        : insight.type === "prediction"
                          ? "warning"
                          : insight.type === "optimization"
                            ? "success"
                            : "brand"
                    }
                  >
                    <span
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      {insight.type}
                    </span>
                  </StatusBadge>
                </TableCell>

                <TableCell>
                  <StatusBadge
                    tone={
                      insight.impact === "Critical"
                        ? "danger"
                        : insight.impact === "High"
                          ? "warning"
                          : insight.impact === "Medium"
                            ? "brand"
                            : "success"
                    }
                  >
                    {insight.impact}
                  </StatusBadge>
                </TableCell>

                <TableCell>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 60,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: "var(--bg-tertiary)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${insight.confidence}% `,
                          height: "100%",
                          borderRadius: 3,
                          backgroundColor:
                            insight.confidence >= 90
                              ? "var(--color-success)"
                              : insight.confidence >= 75
                                ? "var(--color-warning)"
                                : "var(--color-danger)",
                          transition: "width 0.5s ease",
                        }}
                      />
                    </div>

                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "var(--text-secondary)",
                      }}
                    >
                      {insight.confidence}%
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <div
                    style={{
                      maxWidth: 420,
                      fontSize: 12,
                      lineHeight: 1.5,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {insight.description}
                  </div>
                </TableCell>

                <TableCell>
                  <button
                    className="header-btn"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      height: 32,
                      padding: "0 10px",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontSize: 11,
                    }}
                  >
                    View
                    <ArrowRight size={14} />
                  </button>
                </TableCell>
              </TableRow>
            );
          })}

          {filteredInsights.length === 0 && (
            <tr>
              <td colSpan={6}>
                <EmptyState
                  title="No insights found"
                  description="Try changing your search or filters."
                />
              </td>
            </tr>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
