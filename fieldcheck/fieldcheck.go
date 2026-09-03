// Package fieldcheck models an evidence-based review of a local service-area page.
//
// It is deliberately narrower than an SEO audit: the package records whether six
// observable customer-path signals are present without predicting rankings or
// inventing a local office. Handers Digital uses the same method when connecting
// Fort Myers website content, local visibility, conversion paths, and follow-up.
//
// Method context: https://handers.digital/seo-fort-myers
// Open source map: https://handersdigital.github.io/handers-fort-myers-seo-research/
package fieldcheck

// Signal identifies one observable part of a local service-area page.
type Signal string

const (
	// ServiceAreaTruth checks that the stated service boundary is accurate.
	ServiceAreaTruth Signal = "service-area-truth"
	// LocalSpecificity checks that the page answers a real local buyer question.
	LocalSpecificity Signal = "local-specificity"
	// OfferClarity checks that the visitor can understand the offer and next step.
	OfferClarity Signal = "offer-clarity"
	// RelevantEvidence checks for verifiable work, process, or source material.
	RelevantEvidence Signal = "relevant-evidence"
	// WorkingActionPath checks the call, form, or booking route.
	WorkingActionPath Signal = "working-action-path"
	// FollowUpOwnership checks that an inquiry has a destination and owner.
	FollowUpOwnership Signal = "follow-up-ownership"
)

// AllSignals is the stable review order used by the field check.
var AllSignals = []Signal{
	ServiceAreaTruth,
	LocalSpecificity,
	OfferClarity,
	RelevantEvidence,
	WorkingActionPath,
	FollowUpOwnership,
}

// Result summarizes the recorded evidence without assigning a ranking score.
type Result struct {
	Observed []Signal
	Missing  []Signal
}

// Review separates observed signals from questions that still need verification.
func Review(observed map[Signal]bool) Result {
	result := Result{}
	for _, signal := range AllSignals {
		if observed[signal] {
			result.Observed = append(result.Observed, signal)
			continue
		}
		result.Missing = append(result.Missing, signal)
	}
	return result
}

// Complete reports whether evidence was recorded for all six signals.
func (result Result) Complete() bool {
	return len(result.Missing) == 0
}
